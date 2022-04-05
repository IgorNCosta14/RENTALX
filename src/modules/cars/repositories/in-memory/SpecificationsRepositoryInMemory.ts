import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });
    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async findById(ids: string[]): Promise<Specification[]> {
    const allSpecification = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return allSpecification;
  }
}
export { SpecificationRepositoryInMemory };
