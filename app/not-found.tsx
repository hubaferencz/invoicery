import HeroCta from "./(landing-page)/(hero)/HeroCta";


export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-full px-4 text-white min-h-screen bg-primary-700 py-52 flex-col gap-10">
      <h1 className="text-[32px] lg:text-[56px] font-bold leading-tight">
        Page not found 👀
      </h1>
      <p className="text-base font-semibold leading-normal lg:text-lg">
        The page you are looking for does not exist
      </p>
      <HeroCta text={"Return to home page"} link="/" />
    </div>
  );
}
