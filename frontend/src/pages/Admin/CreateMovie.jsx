import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
     useCreateMovieMutation,
     // useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
     const navigate = useNavigate();

     const [movieData, setMovieData] = useState({
          name: "",
          image: "",
          video: "",
          year: 0,
          genre: "",
          detail: "",
          cast: [],
          rating: 0,
     });

     const [createMovie, { isLoading: isCreatingMovie, error: createMovieErrorDetail }] = useCreateMovieMutation();

     const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

     useEffect(() => {
          if (genres) {
               setMovieData((prevData) => ({
                    ...prevData,
                    genre: genres[0]?._id || "",
               }));
          }
     }, [genres]);

     const handleChange = (e) => {
          const { name, value } = e.target;

          if (name === "genre") {
               const selectedGenre = genres.find((genre) => genre.name === value);
               setMovieData((prevData) => ({
                    ...prevData,
                    genre: selectedGenre ? selectedGenre._id : "",
               }));
          } else {
               setMovieData((prevData) => ({
                    ...prevData,
                    [name]: value,
               }));
          }
     };

     const handleCreateMovie = async () => {
          if (
               !movieData.name ||
               !movieData.year ||
               !movieData.detail ||
               !movieData.cast ||
               !movieData.image ||
               !movieData.video
          ) {
               toast.error("Please fill all required fields");
               return;
          }

          try {
               await createMovie(movieData);
               navigate("/admin/movies-list");

               setMovieData({
                    name: "",
                    year: 0,
                    detail: "",
                    cast: [],
                    ratings: 0,
                    image: "",
                    video: "",
                    genre: "",
               });

               toast.success("Movie Added To Database");
          } catch (error) {
               console.error("Failed to create movie: ", createMovieErrorDetail);
               toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
          }
     };

     return (
          <div className="container flex justify-center items-center mt-4">
               <form>
                    <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
                    <div className="mb-4">
                         <label className="block">
                              Name:
                              <input
                                   type="text"
                                   name="name"
                                   value={movieData.name}
                                   onChange={handleChange}
                                   className="border px-2 py-1 w-full"
                              />
                         </label>
                    </div>
                    <div className="mb-4">
                         <label className="block">
                              Year:
                              <input
                                   type="number"
                                   name="year"
                                   value={movieData.year}
                                   onChange={handleChange}
                                   className="border px-2 py-1 w-full"
                              />
                         </label>
                    </div>
                    <div className="mb-4">
                         <label className="block">
                              Detail:
                              <textarea
                                   name="detail"
                                   value={movieData.detail}
                                   onChange={handleChange}
                                   className="border px-2 py-1 w-full"
                              ></textarea>
                         </label>
                    </div>
                    <div className="mb-4">
                         <label className="block">
                              Cast (comma-separated):
                              <input
                                   type="text"
                                   name="cast"
                                   value={movieData.cast.join(", ")}
                                   onChange={(e) =>
                                        setMovieData({ ...movieData, cast: e.target.value.split(", ") })
                                   }
                                   className="border px-2 py-1 w-full"
                              />
                         </label>
                    </div>
                    <div className="mb-4">
                         <label className="block">
                              Genre:
                              <select
                                   name="genre"
                                   value={movieData.genre}
                                   onChange={handleChange}
                                   className="border px-2 py-1 w-full"
                              >
                                   {isLoadingGenres ? (
                                        <option>Loading genres...</option>
                                   ) : (
                                        genres.map((genre) => (
                                             <option key={genre.id} value={genre.id}>
                                                  {genre.name}
                                             </option>
                                        ))
                                   )}
                              </select>
                         </label>
                    </div>
                    <div className="mb-4">
                         <label className="block">
                              Image URL:
                              <input
                                   type="text"
                                   name="image"
                                   value={movieData.image}
                                   onChange={handleChange}
                                   className="border px-2 py-1 w-full"
                              />
                         </label>
                    </div>
                    <div className="mb-4">
                         <label className="block">
                              Video URL:
                              <input
                                   type="text"
                                   name="video"
                                   value={movieData.video}
                                   onChange={handleChange}
                                   className="border px-2 py-1 w-full"
                              />
                         </label>
                    </div>
                    <button
                         type="button"
                         onClick={handleCreateMovie}
                         className="bg-teal-500 text-white px-4 py-2 rounded"
                         disabled={isCreatingMovie}
                    >
                         {isCreatingMovie ? "Creating..." : "Create Movie"}
                    </button>
               </form>
          </div>
     );
};

export default CreateMovie;