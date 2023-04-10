import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { temperamentsFetch } from "../../features/TemperamentsSlice";
import { updateBreed } from "../../features/breedsSlice";

const UpdateBreed = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const breedTemperaments = useSelector(
    (state) => state.temperaments.temperaments
  );
  const temperamentsStatus = useSelector((state) => state.temperaments.status);
  const breeds = useSelector((state) => state.breeds.breeds);
  const error = useSelector((state) => state.temperaments.error);

  const {
    register,
    // watch,
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
  const [input, setInput] = useState({
    temperaments: [],
  });
  const handleSelectTemperaments = (e) => {
    setInput({
      ...input,
      temperaments: [...new Set([...input.temperaments, e.target.value])],
    });
  };
  const handleDelete = (e) => {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== e),
    });
  };

  const onSubmit = async (data) => {
    data.temperaments = input.temperaments;
    const nameFiltered = breeds.filter((breed) => breed.name === data.name);

    if (nameFiltered.length) {
      await swal("Error, cannot be updated, name already exist", "error");
    } else {
      dispatch(updateBreed(id, data));
      alert(JSON.stringify(data));
      await swal("Success updated");

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
      navigate(`/home`);
    }
  };

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
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="h2Form">Updated new Breed</h2>
        <label htmlFor="" className="labelForm">
          Name :
        </label>
        <input
          {...register("name", { required: true, maxLength: 30, minLength: 3 })}
          name="name"
          id="name"
          type="text"
          className="inputForm"
          placeholder="Name of the breed"
        />
        {errors.name && (
          <span>
            This field is required and should be a number with maximum length of
            30 and a minimun of 3
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
        <label className="labelForm">Temperament: </label>
        <select onChange={(e) => handleSelectTemperaments(e)}>
          <option>Select a temperament</option>
          {breedTemperaments?.map((temperament, index) => {
            return (
              <option value={temperament.name} key={index}>
                {temperament.name.toLowerCase()}
              </option>
            );
          })}
        </select>

        <div className="Divtemperaments">
          {
            input.temperaments.map((temperament) => {
              return (
                <div key={temperament} className="temperamentsSel">
                  <button
                    onClick={() => {
                      handleDelete(temperament);
                    }}
                    className="DeleteTemperbtn"
                  >
                    x{temperament}
                  </button>
                </div>
              );
            }) //para poder ver que fui seleccionando
          }
          {input.temperaments}
        </div>

        <button type="submit" className="bntSubmit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBreed;
