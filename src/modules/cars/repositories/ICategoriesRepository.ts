import { Category } from "../entities/Category";

// DTO data transfer object
interface ICreatCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreatCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreatCategoryDTO };
