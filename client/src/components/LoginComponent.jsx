export default function Login() {
  return (
    <>
      <div className="flex items-center justify-center h-[80vh] w-full max-w-sm">
        <div className="w-full ">
          <form>
            <input
              type="text"
              placeholder="name"
              className="border-2 border-[#cacaca] outline-none rounded-md w-[95%] h-10 block mb-4 m-auto "
            />
            <input
              type="email"
              placeholder="email"
              className="w-[95%] m-auto border-2 border-[#cacaca] outline-none rounded-md h-10 block"
            />
          </form>
        </div>
      </div>
    </>
  );
}
