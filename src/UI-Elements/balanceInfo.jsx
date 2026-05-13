export default function BalanceInfo({ money }) {
  return (
    <div className="main-info bg-black text-white h-50 rounded-b-4xl mx-auto w-full ">
      <div className="circle-1"></div>
      <div className="circle-2"></div>
      <div className="text-lg font-semibold" aria-label="Balance of user">
        Balance:
      </div>
      <h1 className="z-10 text-5xl mt-1 font-semibold" aria-label={money}>
        ${money.toLocaleString("en-US")}
      </h1>
    </div>
  );
}
