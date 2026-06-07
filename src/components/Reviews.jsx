import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Reviews() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    const fetchReviews = async () => {

      const querySnapshot = await getDocs(collection(db, "reviews"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(data);
    };

    fetchReviews();

  }, []);

  return (
    <section className="py-20 px-8 bg-black text-center">

      <h2 className="text-4xl font-bold text-red-600 mb-10">
        Opiniones de Clientes 🔥
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}

        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >

        {reviews.map((review) => (

          <SwiperSlide key={review.id}>

            <div className="bg-neutral-900 p-6 rounded-2xl shadow-lg h-full">

              <h3 className="text-xl font-bold text-white mb-2">
                {review.name}
              </h3>

               <p className="text-gray-300">
                {review.text}
              </p>

              <p className="text-yellow-400 text-xl mb-4">
                {"⭐".repeat(review.stars)}
              </p>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>
  );
}