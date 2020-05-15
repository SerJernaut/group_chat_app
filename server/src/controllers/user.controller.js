const { User } = require('./../models');
const Controller = require('../utils/controller');
const{ ForbiddenError, ResourceNotFoundError, BadRequestError } = require('../utils/errors');

class UserController {
  constructor() {
    this._controller = new Controller(User);
  }

  createUser = async (req, res, next) => {
    try {
      const createdUser = await this._controller.create(req.body);
      if (createdUser) {
        const preparedUser = createdUser.toObject();
        delete preparedUser.password;
        delete preparedUser.__v;
        return res.status(201).send(preparedUser);
      }
    } catch (e) {
      next(e);
    }
  };

  deleteUserById = async (req, res, next) => {
    try {
      res.send(await this._controller.delete( req.params.id ));
    } catch (e) {
      next( e );
    }
  };

  getUserById = async (req, res, next) => {
    try {

      res.send( await this._controller.read( req.params.id, {
        password: false,
        __v: false,
      } ) );

    } catch (e) {
      next( e );
    }
  };

  fundUserById = async (req, res, next) => {
    try {
      const {headers: {authorization: userId}} = req;
      req.user = await this._controller.read(userId);
      next();
    } catch (e) {
      next(e);
    }
  };

  findUserByLogin = async (req, res, next) => {
    try {
      const {body: {login}} = req;
      const user = await User.findOne({login},{password: true, login: true, profilePicture: true});
      if (user) {
        req.user = user;
        return next();
      }
      next(new BadRequestError('Login or password is incorrect'));
    } catch (e) {
      next(e);
    }
  };

  compareUserPassword = async (req, res, next) => {
    try {
      const {body: {password}, user} = req;
      if (await user.comparePassword(password)) {

        return next();
      }
      next(new BadRequestError('Login or password is incorrect'));
    } catch (e) {
      next(e);
    }
  };

  checkIfUserLoginExist = async (req, res, next) => {
    try {
      const {body: {login}} = req;
      const user = await User.findOne({login});
      if (user) {
        return next(new ForbiddenError('Login has already in use'));
      }
      next();
    } catch (e) {
      next(e);
    }
  };

  updateUserById = async (req, res, next) => {
    try {
      res.send(await this._controller.update( req.params.id, req.body, {
        new: true,
      } ));
    } catch (e) {
      next( e );
    }
  };
}

module.exports = new UserController();