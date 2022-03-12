import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMomory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;

let categoriesRepositoryInMomory: CategoriesRepositoryInMomory;

describe("Create Categoria", () => {
  beforeEach(() => {
    categoriesRepositoryInMomory = new CategoriesRepositoryInMomory();

    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMomory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "category description Test",
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMomory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "category description Test",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
