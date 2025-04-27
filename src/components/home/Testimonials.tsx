
import React from "react";
import { testimonials } from "@/lib/data";

const Testimonials = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Are Saying
          </h2>
          <p className="text-gray-600">
            Don't just take our word for it. Here's what our community has to say about their
            experience with WheelsTrust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover-scale"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-5.958 3.153 1.14-6.632L.36 7.368l6.652-.965L10 .585l2.988 5.818 6.652.965-4.822 4.738 1.14 6.632z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>

              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Trusted by drivers nationwide</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Toyota_Logo.svg/2560px-Toyota_Logo.svg.png"
              alt="Toyota"
              className="h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png"
              alt="BMW"
              className="h-12 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/2048px-Volkswagen_logo_2019.svg.png"
              alt="Volkswagen"
              className="h-12 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Chevrolet_bowtie_logo.svg/2560px-Chevrolet_bowtie_logo.svg.png"
              alt="Chevrolet"
              className="h-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/2560px-Ford_logo_flat.svg.png"
              alt="Ford"
              className="h-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
