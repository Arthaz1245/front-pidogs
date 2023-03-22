import { useForm, useController } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { temperamentsFetch } from "../../features/TemperamentsSlice";
import { addNewBreed } from "../../features/breedsSlice";

const CreateBreed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMin, setErrorMin] = useState("");
  const breedTemperaments = useSelector(
    (state) => state.temperaments.temperaments
  );
  const temperamentsStatus = useSelector((state) => state.temperaments.status);
  const error = useSelector((state) => state.temperaments.error);
  const onSelectChange = (option) => {
    field.onChange(option.value);
  };
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      min_height: "",
      max_height: "",
      min_weight: "",
      max_weight: "",
      min_lifespan: "",
      max_lifespan: "",
      image: "",
      temperaments: [],
    },
  });
  const { field } = useController({ name: "temperaments", control });
  const onSubmit = async (data) => {
    if (parseInt(data.min_height) > parseInt(data.max_height)) {
      setErrorMin("max_height", {
        type: "manual",
        message: "Max height should be greater than or equal to min height",
      });
      return;
    }
    if (parseInt(data.min_lifespan) > parseInt(data.max_lifespan)) {
      setErrorMin("max_lifespan", {
        type: "manual",
        message: "Max height should be greater than or equal to min height",
      });
      return;
    }
    if (parseInt(data.min_weight) > parseInt(data.max_weight)) {
      setErrorMin("max_weight", {
        type: "manual",
        message: "Max height should be greater than or equal to min height",
      });
      return;
    }

    dispatch(addNewBreed(data));
    alert(JSON.stringify(data));
    await swal("Breed created successfully");

    reset({
      name: "",
      min_height: "",
      max_height: "",
      min_weight: "",
      max_weight: "",
      min_lifespan: "",
      max_lifespan: "",
      image: "",
      temperaments: [],
    });
    navigate("/home");
  };
  console.log(watch());

  useEffect(() => {
    if (temperamentsStatus === "idle") {
      dispatch(temperamentsFetch());
    }
  }, [temperamentsStatus, dispatch]);
  if (temperamentsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (temperamentsStatus === "failed") {
    return <div>{error}</div>;
  }
  const validateImage = (value) => {
    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi;
    return regex.test(value) || "Invalid image URL";
  };
  return (
    <div>
      <h2>Create new Breed</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="" className="labelForm">
          Name :
        </label>
        <input
          {...register("name", { required: true, maxLength: 50 })}
          name="name"
          id="name"
          type="text"
          className="inputForm"
          placeholder="Name of the breed"
        />
        {errors.name && (
          <span>
            This field is required and should be a number with maximum length of
            50
          </span>
        )}
        <label htmlFor="" className="labelForm">
          Image:{" "}
        </label>
        <input
          {...register("image", { required: true, validate: validateImage })}
          id="image"
          name="image"
          type="text"
          className="inputForm"
          placeholder="Image of the breed"
        />
        {errors.image && <span>{errors.image.message}</span>}
        <label htmlFor="" className="labelForm">
          Min Height:{" "}
        </label>
        <input
          {...register("min_height", { required: true, maxLength: 3 })}
          id="min_height"
          type="number"
          name="min_height"
          className="inputForm"
          placeholder="min height of the dog"
        />
        {errors.min_height && (
          <span>
            This field is required and should be a number with maximum length of
            3
          </span>
        )}
        <label htmlFor="" className="labelForm">
          Max Height:{" "}
        </label>
        <input
          {...register("max_height", { required: true, maxLength: 3 })}
          id="max_height"
          name="max_height"
          type="number"
          className="inputForm"
          placeholder="max height of the dog"
        />
        {errors.max_height && (
          <span>
            This field is required and should be a number with maximum length of
            3
          </span>
        )}
        {errorMin && <p style={{ color: "red" }}>{errorMin}</p>}
        <label htmlFor="" className="labelForm">
          Min Weight:{" "}
        </label>
        <input
          {...register("min_weight", { required: true, maxLength: 3 })}
          id="min_weight"
          name="min_weight"
          type="number"
          className="inputForm"
          placeholder="min weight of the dog"
        />
        {errors.min_weight && (
          <span>
            This field is required and should be a number with maximum length of
            3
          </span>
        )}
        <label htmlFor="" className="labelForm">
          Max Weight:{" "}
        </label>
        <input
          {...register("max_weight", { required: true, maxLength: 3 })}
          id="max_weight"
          name="max_weight"
          type="number"
          className="inputForm"
          placeholder="max weight of the dogn"
        />
        {errors.max_weight && (
          <span>
            This field is required and should be a number with maximum length of
            3
          </span>
        )}
        {errorMin && <p style={{ color: "red" }}>{errorMin}</p>}
        <label htmlFor="" className="labelForm">
          Min Lifespan:{" "}
        </label>
        <input
          {...register("min_lifespan", { required: true, maxLength: 3 })}
          id="min_lifespan"
          name="min_lifespan"
          type="number"
          className="inputForm"
          placeholder="min lifespan of the dog"
        />
        {errors.min_lifespan && (
          <span>
            This field is required and should be a number with maximum length of
            3
          </span>
        )}
        <label htmlFor="" className="labelForm">
          Max Lifespan:{" "}
        </label>
        <input
          {...register("max_lifespan", { required: true, maxLength: 3 })}
          id="max_lifespan"
          name="max_lifespan"
          type="number"
          className="inputForm"
          placeholder="max lifespan of the dog"
        />
        {errors.max_lifespan && (
          <span>
            This field is required and should be a number with maximum length of
            3
          </span>
        )}
        {errorMin && <p style={{ color: "red" }}>{errorMin}</p>}
        <label className="labelForm">Temperament: </label>
        <select
          onChange={onSelectChange}
          {...register("temperaments", { required: true })}
          className="SelectTemp"
          id="temperaments "
          value={field.value}
        >
          <option>Select a temperament</option>
          {breedTemperaments?.map((temperament, index) => {
            return (
              <option value={temperament.name} key={index}>
                {temperament.name.toLowerCase()}
              </option>
            );
          })}
        </select>

        <button type="submit" className="bntSubmit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBreed;
