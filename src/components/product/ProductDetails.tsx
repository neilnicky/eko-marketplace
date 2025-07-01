export default function ProductDetails({
  name,
  price,
  unit,
  description,
}: {
  name: string;
  price: number;
  unit?: string;
  description?: string;
}) {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
        <p className="text-2xl font-bold text-green-600">
          R$ {price.toFixed(2)}
        </p>
        {unit && <p className="text-sm text-gray-500">per {unit}</p>}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </>
  );
}
