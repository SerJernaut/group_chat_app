const{ BadRequestError, ResourceNotFoundError } = require('./../errors');

class Controller {
    constructor(model) {
        this._model = model;
    }

    get model() {
        return this._model;
    }

    create = async (data) => {
        const newInstance = await this._model.create(data);
        if (newInstance) {
            return newInstance;
        }
        throw new BadRequestError();
    };

    read = async (id, options = {}) => {
        const instance = await this._model.findById(id, options);
        if (instance) {
            return instance;
        }
        throw new ResourceNotFoundError(this._model.name);
    };

    update = async (id, data, options = {}) => {
        const updatedInstance = await this._model.findByIdAndUpdate(id, data, options);
        if (updatedInstance) {
            return updatedInstance;
        }
        throw new ResourceNotFoundError(this._model.name);
    };

    delete = async (id) => {
        const deletedInstance = await this._model.findByIdAndDelete(id);
        if (deletedInstance) {
            return deletedInstance;
        }
        throw new ResourceNotFoundError(this._model.name);
    };
}

module.exports = Controller;