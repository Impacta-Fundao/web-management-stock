type message = {message:string | null}
export default function CardTxt({message}:message) {
  return (
    <div className="absolute right-16 top-10 bg-white h-40 w-96 rounded-md">
      {message}
    </div>
  );
}
