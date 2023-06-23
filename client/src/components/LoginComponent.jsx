export default function Login() {
  return (
    <>
      <form>
        <input
          type="text"
          placeholder="name"
          className="border border-gray-500"
        />
        <input type="email" placeholder="email" />
      </form>
    </>
  );
}
