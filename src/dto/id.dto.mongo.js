export class IdDtoMongo {
	entity;
	constructor(entity) {
		const { id, ...rest } = entity;
		this.entity = { _id: id, ...rest };
	}
}
