import { FC } from "react";

const LoadingScreen: FC = () => {
  return (
    <main className="flex justify-center items-start gap-4">
      <section className="flex gap-4 p-8 bg-white h-[100dvh] min-w-[400px]">
        <h2 className="text-4xl font-bold">Recent posts</h2>
      </section>
      <div className="flex flex-col gap-4">
        <section className="p-8 bg-white min-w-[400px]">
          <h2 className="text-4xl font-bold">Loading user data...</h2>
        </section>
        <section className="p-8 bg-white min-w-[400px]">
          <h2 className="text-4xl font-bold">Create post</h2>
        </section>
      </div>
    </main>
  );
};

export default LoadingScreen;
