import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
     useGetSpecificMovieQuery,
     useUpdateMovieMutation,
     useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const UpdateMovie = () => {
     const { id } = useParams();
     const navigate = useNavigate();

     const [movieData, setMovieData] = useState({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          ratings: 0,
          image: "",
          video: "",
     });

     const { data: initialMovieData, isLoading: isLoadingMovie } = useGetSpecificMovieQuery(id);

     useEffect(() => {
          if (initialMovieData) {
               setMovieData({
                    name: initialMovieData.name,
                    year: initialMovieData.year,
                    detail: initialMovieData.detail,
                    cast: initialMovieData.cast,
                    ratings: initialMovieData.ratings,
                    image: initialMovieData.image,
                    video: initialMovieData.video || "",
               });
          }
     }, [initialMovieData]);

     const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation();
     const [deleteMovie] = useDeleteMovieMutation();

     const handleChange = (e) => {
          const { name, value } = e.target;
          setMovieData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
     };

     const handleUpdateMovie = async () => {
          if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast || !movieData.image || !movieData.video) {
               toast.error("Please fill in all required fields");
               return;
          }

          try {
               await updateMovie({ id, updatedMovie: movieData });
               navigate("/movies");
               toast.success("Movie updated successfully");
          } catch (error) {
               console.error("Failed to update movie:", error);
               toast.error(`Failed to update movie: ${error?.message}`);
          }
     };

     const handleDeleteMovie = async () => {
          try {
               await deleteMovie(id);
               navigate("/movies");
               toast.success("Movie deleted successfully");
          } catch (error) {
               console.error("Failed to delete movie:", error);
               toast.error(`Failed to delete movie: ${error?.message}`);
          }
     };

     return (
          <div className="container flex justify-center items-center mt-4">
               <form>
                    <p className="text-green-200 w-[50rem] text-2xl mb-4">Update Movie</p>
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
                              />
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
                         onClick={handleUpdateMovie}
                         className="bg-teal-500 text-white px-4 py-2 rounded"
                         disabled={isUpdatingMovie}
                    >
                         {isUpdatingMovie ? "Updating..." : "Update Movie"}
                    </button>

                    <button
                         type="button"
                         onClick={handleDeleteMovie}
                         className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                         disabled={isUpdatingMovie}
                    >
                         {isUpdatingMovie ? "Deleting..." : "Delete Movie"}
                    </button>
               </form>
          </div>
     );
};

export default UpdateMovie;
