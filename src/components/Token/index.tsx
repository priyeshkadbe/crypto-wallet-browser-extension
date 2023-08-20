import {
  CurrencyDollarIcon
} from "@heroicons/react/20/solid";
export default function Token() {
  return (
    <div className="flex justify-between mx-2 p-2">
      <div className="flex justify-center items-center gap-2">
        <CurrencyDollarIcon className="h-8 w-8" />
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">Matic</h2>
          <h2 className="text-lg ">0 matic</h2>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <h2 className="text-lg">1 usd</h2>
      </div>
    </div>
  );
}
