import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/AdminMeals";
import { FaPlus, FaList, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { MEAL, DIETARY, SORT } from "../../../utils/constants";
import { FormRowSelect, FormRow } from "../components";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { allMealsQuery } from "../actionsAndLoaders/MealsLoader"; // Using the query you provided

const AdminMeals = () => {
  const navigate = useNavigate();
  const { searchValues } = useLoaderData();

  // Initialize filters from URL parameters or default values
  const [filters, setFilters] = useState({
    name: searchValues.name || "",
    country: searchValues.country || "",
    mealType: searchValues.mealType || "all",
    dietary: searchValues.dietary || "all",
    sort: searchValues.sort || "newest",
    page: searchValues.page ? Number(searchValues.page) : 1,
  });

  // Get meals data using React Query
  const { data, isLoading } = useQuery(allMealsQuery(filters));
  const meals = data?.meals || [];

  const [showForm, setShowForm] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [mealForm, setMealForm] = useState({
    name: "",
    mealType: MEAL.BREAKFAST,
    country: "",
    dietary: [],
    isRecommended: false,
  });

  // Ingredients and preparation steps state
  const [ingredientList, setIngredientList] = useState([
    {
      name: "",
      quantity: "",
      unit: "",
      substitutions: [],
      price: "",
    },
  ]);

  const [preparationStepsList, setPreparationStepsList] = useState({
    description: "",
    skillLevel: "Beginner",
    steps: [
      {
        stepNumber: 1,
        instruction: "",
        duration: "",
      },
    ],
  });

  // In the useEffect that updates URL parameters, ensure page is included
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.name) params.append("name", filters.name);
    if (filters.country) params.append("country", filters.country);
    if (filters.mealType !== "all") params.append("mealType", filters.mealType);
    if (filters.dietary !== "all") params.append("dietary", filters.dietary);
    if (filters.sort !== "newest") params.append("sort", filters.sort);
    if (filters.page !== 1) params.append("page", filters.page.toString());

    navigate(`?${params.toString()}`);
  }, [filters, navigate]);

  // Make sure handleFilterChange converts page to a number
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: field === "page" ? Number(value) : value,
      // Reset page to 1 when changing filters (except when changing page)
      page: field !== "page" ? 1 : Number(value),
    }));
  };

  // Handle filtering using query data
  const getFilteredMeals = () => {
    // No need to filter here since we're filtering via the API
    return meals;
  };

  // Helper to add or update an ingredient
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredientList];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setIngredientList(updatedIngredients);
  };

  // Helper to add a new ingredient field
  const addIngredientField = () => {
    setIngredientList([
      ...ingredientList,
      { name: "", quantity: "", unit: "", substitutions: [], price: "" },
    ]);
  };

  // Helper to remove an ingredient field
  const removeIngredientField = (index) => {
    if (ingredientList.length > 1) {
      const updatedIngredients = [...ingredientList];
      updatedIngredients.splice(index, 1);
      setIngredientList(updatedIngredients);
    }
  };

  // Helper functions for handling substitutions
  const addSubstitution = (ingredientIndex) => {
    const updatedIngredients = [...ingredientList];
    if (!Array.isArray(updatedIngredients[ingredientIndex].substitutions)) {
      updatedIngredients[ingredientIndex].substitutions = [];
    }
    updatedIngredients[ingredientIndex].substitutions.push({
      name: "",
      quantity: "",
      unit: "",
    });
    setIngredientList(updatedIngredients);
  };

  const handleSubstitutionChange = (
    ingredientIndex,
    subIndex,
    field,
    value
  ) => {
    const updatedIngredients = [...ingredientList];
    if (!updatedIngredients[ingredientIndex].substitutions[subIndex]) {
      updatedIngredients[ingredientIndex].substitutions[subIndex] = {};
    }
    updatedIngredients[ingredientIndex].substitutions[subIndex][field] = value;
    setIngredientList(updatedIngredients);
  };

  const removeSubstitution = (ingredientIndex, subIndex) => {
    const updatedIngredients = [...ingredientList];
    updatedIngredients[ingredientIndex].substitutions.splice(subIndex, 1);
    setIngredientList(updatedIngredients);
  };

  // Helper to update preparation steps
  const handlePrepStepsChange = (field, value) => {
    setPreparationStepsList({
      ...preparationStepsList,
      [field]: value,
    });
  };

  // Helper to add a new step
  const addStep = () => {
    const newStepNumber = preparationStepsList.steps.length + 1;
    setPreparationStepsList({
      ...preparationStepsList,
      steps: [
        ...preparationStepsList.steps,
        {
          stepNumber: newStepNumber,
          instruction: "",
          duration: "",
        },
      ],
    });
  };

  // Update step instruction
  const updateStepInstruction = (index, value) => {
    const updatedSteps = [...preparationStepsList.steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      instruction: value,
    };
    setPreparationStepsList({
      ...preparationStepsList,
      steps: updatedSteps,
    });
  };

  // Update step duration
  const updateStepDuration = (index, value) => {
    const updatedSteps = [...preparationStepsList.steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      duration: value,
    };
    setPreparationStepsList({
      ...preparationStepsList,
      steps: updatedSteps,
    });
  };

  // Helper to remove a step
  const removeStep = (index) => {
    if (preparationStepsList.steps.length > 1) {
      const updatedSteps = [...preparationStepsList.steps];
      updatedSteps.splice(index, 1);

      // Renumber the remaining steps
      const renumberedSteps = updatedSteps.map((step, idx) => ({
        ...step,
        stepNumber: idx + 1,
      }));

      setPreparationStepsList({
        ...preparationStepsList,
        steps: renumberedSteps,
      });
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!mealForm.name.trim()) {
      toast.error("Meal name is required");
      return;
    }

    if (!mealForm.country.trim()) {
      toast.error("Country is required");
      return;
    }

    if (!mealForm.mealType) {
      toast.error("Meal type is required");
      return;
    }

    // Validate ingredients
    const validIngredients = ingredientList.filter((ing) => ing.name.trim());
    if (validIngredients.length === 0) {
      toast.error("Please add at least one ingredient");
      return;
    }

    // Validate preparation steps
    const validSteps = preparationStepsList.steps.filter((step) =>
      step.instruction.trim()
    );
    if (validSteps.length === 0) {
      toast.error("Please add at least one preparation step");
      return;
    }

    if (!imageFile && !isEditing) {
      toast.error("Please add a meal image");
      return;
    }

    try {
      let mealId;

      // Ensure dietary has valid values
      const dietaryValues =
        mealForm.dietary && mealForm.dietary.length > 0
          ? mealForm.dietary
          : [DIETARY.NONE];

      if (isEditing) {
        // HANDLING MEAL UPDATE
        mealId = selectedMeal._id;

        // 1. Update the meal basic info using PATCH
        const formData = new FormData();
        formData.append("name", mealForm.name);
        formData.append("mealType", mealForm.mealType);
        formData.append("country", mealForm.country);
        formData.append("isRecommended", mealForm.isRecommended);

        // Handle dietary values
        for (const diet of dietaryValues) {
          formData.append("dietary", diet);
        }

        // Add image if present
        if (imageFile) {
          formData.append("image", imageFile);
        }

        // Update the meal
        await customFetch.patch(`/meals/${mealId}`, formData);

        // 2. Handle ingredients updates - get currently stored ingredients
        const mealResponse = await customFetch.get(`/meals/${mealId}`);
        const existingIngredients = mealResponse.data.meal.ingredients || [];
        const existingIngredientIds = new Map();

        // Create a map of existing ingredient IDs for quick lookup
        existingIngredients.forEach((ing) => {
          existingIngredientIds.set(ing._id, ing);
        });

        // For each ingredient in the form
        for (let i = 0; i < validIngredients.length; i++) {
          const ingredient = validIngredients[i];

          // Check if this is an existing ingredient we're updating
          if (i < existingIngredients.length) {
            // Update existing ingredient
            const existingId = existingIngredients[i]._id;
            await customFetch.patch(`/ingredients/${existingId}`, {
              ...ingredient,
              meal: mealId,
            });
            existingIngredientIds.delete(existingId);
          } else {
            // Create new ingredient
            await customFetch.post(`/ingredients`, {
              ...ingredient,
              meal: mealId,
            });
          }
        }

        // Delete any remaining ingredients that weren't updated
        for (const [ingredientId] of existingIngredientIds) {
          await customFetch.delete(`/ingredients/${ingredientId}`);
        }

        // 3. Handle preparation steps update
        const existingSteps = mealResponse.data.meal.preparationSteps || [];

        // Filter out steps with empty instructions
        const validPrepSteps = preparationStepsList.steps.filter((step) =>
          step.instruction.trim()
        );

        // If we have existing steps, update them
        if (existingSteps.length > 0) {
          const stepId = existingSteps[0]._id;
          await customFetch.patch(`/preparationSteps/${stepId}`, {
            description: preparationStepsList.description,
            skillLevel: preparationStepsList.skillLevel,
            steps: validPrepSteps,
            meal: mealId,
          });
        } else {
          // Create new preparation steps if none exist
          await customFetch.post(`/preparationSteps`, {
            description: preparationStepsList.description,
            skillLevel: preparationStepsList.skillLevel,
            steps: validPrepSteps,
            meal: mealId,
          });
        }
      } else {
        // HANDLING NEW MEAL CREATION
        const formData = new FormData();
        formData.append("name", mealForm.name);
        formData.append("mealType", mealForm.mealType);
        formData.append("country", mealForm.country);
        formData.append("isRecommended", mealForm.isRecommended);

        for (const diet of dietaryValues) {
          formData.append("dietary", diet);
        }

        if (imageFile) {
          formData.append("image", imageFile);
        }

        const mealResponse = await customFetch.post("/meals", formData);
        mealId = mealResponse.data.meal._id;

        // Create ingredients for the new meal
        for (const ingredient of validIngredients) {
          await customFetch.post("/ingredients", {
            ...ingredient,
            meal: mealId,
          });
        }

        // Filter out steps with empty instructions
        const validPrepSteps = preparationStepsList.steps.filter((step) =>
          step.instruction.trim()
        );

        // Create preparation steps for the new meal
        await customFetch.post("/preparationSteps", {
          description: preparationStepsList.description,
          skillLevel: preparationStepsList.skillLevel,
          steps: validPrepSteps,
          meal: mealId,
        });
      }

      toast.success(
        isEditing ? "Meal updated successfully" : "Meal created successfully"
      );
      resetForm();

      // Refetch data through React Query's invalidation
      navigate("?");
      setShowForm(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = async (meal) => {
    setSelectedMeal(meal);
    setMealForm({
      name: meal.name,
      mealType: meal.mealType,
      country: meal.country,
      dietary: meal.dietary || [],
      isRecommended: meal.isRecommended || false,
    });

    // Fetch full meal details including populated ingredients and preparation steps
    try {
      const response = await customFetch.get(`/meals/${meal._id}`);
      const fullMeal = response.data.meal;

      // Set ingredients
      if (fullMeal.ingredients && fullMeal.ingredients.length > 0) {
        setIngredientList(
          fullMeal.ingredients.map((ing) => ({
            name: ing.name || "",
            quantity: ing.quantity || "",
            unit: ing.unit || "",
            substitutions: Array.isArray(ing.substitutions)
              ? ing.substitutions
              : [],
            price: ing.price || "",
          }))
        );
      } else {
        // Reset to default if no ingredients
        setIngredientList([
          {
            name: "",
            quantity: "",
            unit: "",
            substitutions: [],
            price: "",
          },
        ]);
      }

      // Set preparation steps
      if (fullMeal.preparationSteps && fullMeal.preparationSteps.length > 0) {
        const prepStep = fullMeal.preparationSteps[0]; // Assuming one preparation step per meal

        // Handle case where steps might be formatted differently
        let formattedSteps;
        if (prepStep.steps && Array.isArray(prepStep.steps)) {
          if (typeof prepStep.steps[0] === "string") {
            // Convert array of strings to array of objects
            formattedSteps = prepStep.steps.map((step, index) => ({
              stepNumber: index + 1,
              instruction: step,
              duration: "",
            }));
          } else {
            // Use the steps as is
            formattedSteps = prepStep.steps;
          }
        } else {
          formattedSteps = [
            {
              stepNumber: 1,
              instruction: "",
              duration: "",
            },
          ];
        }

        setPreparationStepsList({
          description: prepStep.description || "",
          skillLevel: prepStep.skillLevel || "Beginner",
          steps: formattedSteps,
        });
      } else {
        // Reset to default if no preparation steps
        setPreparationStepsList({
          description: "",
          skillLevel: "Beginner",
          steps: [
            {
              stepNumber: 1,
              instruction: "",
              duration: "",
            },
          ],
        });
      }

      setIsEditing(true);
      setShowForm(true);
    } catch (error) {
      toast.error("Error fetching meal details");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      try {
        // First, fetch the full meal to get associated entities
        const response = await customFetch.get(`/meals/${id}`);
        const meal = response.data.meal;

        // Delete ingredients
        if (meal.ingredients && meal.ingredients.length > 0) {
          for (const ingredient of meal.ingredients) {
            try {
              const ingredientId =
                typeof ingredient === "object" ? ingredient._id : ingredient;
              await customFetch.delete(`/ingredients/${ingredientId}`);
            } catch (error) {
              console.warn(
                `Warning: Could not delete ingredient: ${error.message}`
              );
            }
          }
        }

        // Delete preparation steps
        if (meal.preparationSteps && meal.preparationSteps.length > 0) {
          for (const step of meal.preparationSteps) {
            try {
              const stepId = typeof step === "object" ? step._id : step;
              await customFetch.delete(`/preparationSteps/${stepId}`);
            } catch (error) {
              console.warn(
                `Warning: Could not delete preparation step: ${error.message}`
              );
            }
          }
        }

        // Delete the meal
        await customFetch.delete(`/meals/${id}`);
        toast.success("Meal deleted successfully");

        // Refetch data through React Query's invalidation
        navigate("?");
      } catch (error) {
        toast.error(
          "Error deleting meal: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  const resetForm = () => {
    setMealForm({
      name: "",
      mealType: MEAL.BREAKFAST,
      country: "",
      dietary: [],
      isRecommended: false,
    });
    setIngredientList([
      {
        name: "",
        quantity: "",
        unit: "",
        substitutions: [],
        price: "",
      },
    ]);
    setPreparationStepsList({
      description: "",
      skillLevel: "Beginner",
      steps: [
        {
          stepNumber: 1,
          instruction: "",
          duration: "",
        },
      ],
    });
    setImageFile(null);
    setSelectedMeal(null);
    setIsEditing(false);
  };

  return (
    <Wrapper>
      <div className="admin-content">
        <div className="header">
          <h2>
            {showForm
              ? isEditing
                ? "Edit Meal"
                : "Create New Meal"
              : "All Meals"}
          </h2>
          <button
            className="btn toggle-btn"
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) resetForm();
            }}
          >
            {showForm ? <FaList /> : <FaPlus />}
            {showForm ? "View Meals" : "Create Meal"}
          </button>
        </div>

        {showForm ? (
          <div className="meal-form">
            <form onSubmit={handleSubmit}>
              {/* Meal Information Section */}
              <section>
                <h3 className="section-title">Basic Meal Information</h3>
                <FormRow
                  type="text"
                  name="name"
                  value={mealForm.name}
                  handleChange={(e) =>
                    setMealForm({ ...mealForm, name: e.target.value })
                  }
                  labelText="Meal Name"
                />

                <div className="form-row">
                  <label htmlFor="mealType">Meal Type</label>
                  <select
                    name="mealType"
                    value={mealForm.mealType}
                    onChange={(e) =>
                      setMealForm({ ...mealForm, mealType: e.target.value })
                    }
                  >
                    {Object.values(MEAL).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <FormRow
                  type="text"
                  name="country"
                  value={mealForm.country}
                  handleChange={(e) =>
                    setMealForm({ ...mealForm, country: e.target.value })
                  }
                  labelText="Country"
                />

                <div className="form-row">
                  <label htmlFor="dietary">Dietary Options</label>
                  <select
                    multiple
                    name="dietary"
                    value={mealForm.dietary}
                    onChange={(e) =>
                      setMealForm({
                        ...mealForm,
                        dietary: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                    }
                  >
                    {Object.values(DIETARY).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <label htmlFor="image">Meal Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>

                <div className="form-row">
                  <label>
                    <input
                      type="checkbox"
                      checked={mealForm.isRecommended}
                      onChange={(e) =>
                        setMealForm({
                          ...mealForm,
                          isRecommended: e.target.checked,
                        })
                      }
                    />
                    Recommended Meal
                  </label>
                </div>
              </section>

              {/* Ingredients Section */}
              <section>
                <h3 className="section-title">Ingredients</h3>
                {ingredientList.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <h4>Ingredient {index + 1}</h4>
                    <FormRow
                      type="text"
                      name={`ingredient-name-${index}`}
                      value={ingredient.name}
                      handleChange={(e) =>
                        handleIngredientChange(index, "name", e.target.value)
                      }
                      labelText="Name"
                    />
                    <div className="quantity-row">
                      <FormRow
                        type="text"
                        name={`ingredient-quantity-${index}`}
                        value={ingredient.quantity}
                        handleChange={(e) =>
                          handleIngredientChange(
                            index,
                            "quantity",
                            e.target.value
                          )
                        }
                        labelText="Quantity"
                      />
                      <FormRow
                        type="text"
                        name={`ingredient-unit-${index}`}
                        value={ingredient.unit}
                        handleChange={(e) =>
                          handleIngredientChange(index, "unit", e.target.value)
                        }
                        labelText="Unit"
                      />
                    </div>
                    <FormRow
                      type="text"
                      name={`ingredient-price-${index}`}
                      value={ingredient.price}
                      handleChange={(e) =>
                        handleIngredientChange(index, "price", e.target.value)
                      }
                      labelText="Price"
                    />

                    {/* Substitutions Section */}
                    <div className="substitutions-container">
                      <label>Substitutions</label>
                      {ingredient.substitutions &&
                        ingredient.substitutions.map((sub, subIndex) => (
                          <div key={subIndex} className="substitution-row">
                            <FormRow
                              type="text"
                              name={`substitution-name-${index}-${subIndex}`}
                              value={sub.name || ""}
                              handleChange={(e) =>
                                handleSubstitutionChange(
                                  index,
                                  subIndex,
                                  "name",
                                  e.target.value
                                )
                              }
                              labelText="Name"
                            />
                            <div className="quantity-row">
                              <FormRow
                                type="text"
                                name={`substitution-quantity-${index}-${subIndex}`}
                                value={sub.quantity || ""}
                                handleChange={(e) =>
                                  handleSubstitutionChange(
                                    index,
                                    subIndex,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                                labelText="Quantity"
                              />
                              <FormRow
                                type="text"
                                name={`substitution-unit-${index}-${subIndex}`}
                                value={sub.unit || ""}
                                handleChange={(e) =>
                                  handleSubstitutionChange(
                                    index,
                                    subIndex,
                                    "unit",
                                    e.target.value
                                  )
                                }
                                labelText="Unit"
                              />
                            </div>
                            <button
                              type="button"
                              className="btn remove-btn"
                              onClick={() =>
                                removeSubstitution(index, subIndex)
                              }
                            >
                              Remove Substitution
                            </button>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="btn add-btn"
                        onClick={() => addSubstitution(index)}
                      >
                        Add Substitution
                      </button>
                    </div>

                    {ingredientList.length > 1 && (
                      <button
                        type="button"
                        className="btn remove-btn"
                        onClick={() => removeIngredientField(index)}
                      >
                        Remove Ingredient
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn add-btn"
                  onClick={addIngredientField}
                >
                  Add Another Ingredient
                </button>
              </section>

              {/* Preparation Steps Section */}
              <section className="preparation-section">
                <h3 className="section-title">Preparation</h3>

                <div className="form-row">
                  <FormRow
                    type="text"
                    name="prep-description"
                    value={preparationStepsList.description}
                    handleChange={(e) =>
                      handlePrepStepsChange("description", e.target.value)
                    }
                    labelText="Description"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="skillLevel">Skill Level</label>
                  <select
                    className="skill-level-select"
                    name="skillLevel"
                    value={preparationStepsList.skillLevel}
                    onChange={(e) =>
                      handlePrepStepsChange("skillLevel", e.target.value)
                    }
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <h4>Steps</h4>
                {preparationStepsList.steps.map((step, index) => (
                  <div key={index} className="step-item">
                    <div className="step-header">
                      <h4>Step {step.stepNumber}</h4>
                      {preparationStepsList.steps.length > 1 && (
                        <button
                          type="button"
                          className="btn remove-btn small"
                          onClick={() => removeStep(index)}
                        >
                          Remove Step
                        </button>
                      )}
                    </div>
                    <div className="form-row">
                      <label htmlFor={`step-instruction-${index}`}>
                        Instruction
                      </label>
                      <textarea
                        className="form-textarea"
                        name={`step-instruction-${index}`}
                        value={step.instruction}
                        onChange={(e) =>
                          updateStepInstruction(index, e.target.value)
                        }
                      />
                    </div>
                    <FormRow
                      type="text"
                      name={`step-duration-${index}`}
                      value={step.duration}
                      handleChange={(e) =>
                        updateStepDuration(index, e.target.value)
                      }
                      labelText="Duration (e.g., '10 minutes')"
                    />
                  </div>
                ))}
                <button type="button" className="btn add-btn" onClick={addStep}>
                  Add Another Step
                </button>
              </section>

              <div className="btn-container">
                <button type="submit" className="btn submit-btn">
                  {isEditing ? "Update Meal" : "Create Meal"}
                </button>
                <button
                  type="button"
                  className="btn clear-btn"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="meals-list">
            <div className="filters-container">
              <FormRow
                type="text"
                name="name"
                labelText="Search Meal"
                value={filters.name}
                handleChange={(e) => handleFilterChange("name", e.target.value)}
                required={true}
              />
              <FormRow
                type="text"
                name="country"
                labelText="Country"
                required={true}
                value={filters.country}
                handleChange={(e) =>
                  handleFilterChange("country", e.target.value)
                }
              />
              <FormRowSelect
                labelText="Meal Type"
                required={true}
                name="mealType"
                list={["all", ...Object.values(MEAL)]}
                value={filters.mealType}
                handleChange={(e) =>
                  handleFilterChange("mealType", e.target.value)
                }
              />
              <FormRowSelect
                labelText="Dietary"
                name="dietary"
                list={["all", ...Object.values(DIETARY)]}
                value={filters.dietary}
                handleChange={(e) =>
                  handleFilterChange("dietary", e.target.value)
                }
              />
              <FormRowSelect
                labelText="Sort"
                name="sort"
                list={Object.values(SORT)}
                value={filters.sort}
                handleChange={(e) => handleFilterChange("sort", e.target.value)}
              />
              <button
                className="btn clear-btn"
                onClick={() => {
                  setFilters({
                    name: "",
                    country: "",
                    mealType: "all",
                    dietary: "all",
                    sort: "newest",
                    page: 1,
                  });
                }}
              >
                Clear Filters
              </button>
            </div>

            {isLoading ? (
              <div className="loading-container">Loading meals...</div>
            ) : (
              <div className="meals-grid">
                {getFilteredMeals().map((meal) => (
                  <div key={meal._id} className="meal-card">
                    <img src={meal.image} alt={meal.name} />
                    <div className="meal-info">
                      <h3>{meal.name}</h3>
                      <p>{meal.mealType}</p>
                      <p>{meal.country}</p>
                    </div>
                    <div className="meal-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(meal)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(meal._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {data && data.numOfPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handleFilterChange("page", 1)}
                  disabled={filters.page === 1}
                  className="btn btn-first"
                >
                  First
                </button>
                <button
                  onClick={() =>
                    handleFilterChange("page", Math.max(1, filters.page - 1))
                  }
                  disabled={filters.page === 1}
                  className="btn btn-prev"
                >
                  Prev
                </button>
                <span className="page-info">
                  Page {filters.page} of {data.numOfPages}
                </span>
                <button
                  onClick={() =>
                    handleFilterChange(
                      "page",
                      Math.min(data.numOfPages, filters.page + 1)
                    )
                  }
                  disabled={filters.page === data.numOfPages}
                  className="btn btn-next"
                >
                  Next
                </button>
                <button
                  onClick={() => handleFilterChange("page", data.numOfPages)}
                  disabled={filters.page === data.numOfPages}
                  className="btn btn-last"
                >
                  Last
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default AdminMeals;
