interface StepProps {
  rank: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export function Step({ rank, title, subtitle, description, image }: StepProps) {
  return (
    <article
      className="flex overflow-hidden flex-col self-stretch p-0 md:p-6 rounded-md md:rounded-xl border border-solid border-[#CECECE] md:gap-6 select-none group h-min md:h-full"
      aria-labelledby={`step-title-${rank}`}
      aria-describedby={`step-desc-${rank}`}
    >
      <div className="flex overflow-hidden flex-col w-full md:rounded-xl min-h-[190px] md:min-h-[220px]">
        <img
          loading="lazy"
          src={image}
          alt={`Step ${rank}: ${title}`}
          className="object-cover object-left w-full h-full transition-transform duration-500 ease-in-out md:group-hover:scale-125"
        />
      </div>
      <div className="flex flex-col items-start gap-4 p-4 justify-normal md:gap-6 md:p-0">
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-start w-full gap-4 font-semibold md:flex-row">
            <span
              className="border-2 flex items-center aspect-square font-semibold justify-center text-lg border-[#EFEFEF] w-12 h-12 text-white bg-black rounded-full transition-all duration-500 md:group-hover:border-primary-300 md:group-hover:bg-primary-800"
              aria-label={`Step ${rank}`}
            >
              0{rank}
            </span>
            <div className="flex flex-col items-start justify-start gap-1 text-black">
              <h3 id={`step-title-${rank}`} className="text-lg leading-normal ">
                {title}
              </h3>
              <p className="text-base leading-normal">{subtitle}</p>
            </div>
          </div>
        </div>
        <p
          id={`step-desc-${rank}`}
          className="text-base font-normal leading-normal text-black"
        >
          {description}
        </p>
      </div>
    </article>
  );
}
