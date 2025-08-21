import React from "react";
 

const transactions = [
  {
    date: "30 May",
    postDate: "Post date 30 May",
    description: "FOSILGROUP.COM NUMBER: 78172503",
    amount: "-5501.60 USD",
  },
  {
    date: "12 Jun",
    postDate: "Post date 14 Jun",
    description: "SP Digital PL-Utilitie SINGAPORE SG Ref No: 74541834165288079492588",
    amount: "-4,654.70 SGD",
  },
  {
    date: "29 May",
    postDate: "Post date 31 May",
    description: "SP Digital PL-Utilitie SINGAPORE SG Ref No: 74541834151288079023504",
    amount: "-526.75 SGD",
  },
];

const Taiwan = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="bg-blue-700 text-white p-4 rounded-t-xl shadow-md">
        <h1 className="text-xl font-semibold text-center">UOB ONE CARD</h1>
        <div className="mt-2 flex justify-around text-sm">
          <span className="border-b-2 border-white pb-1">Transactions</span>
          <span>Details</span>
          <span>Settings</span>
        </div>
      </div>

      <div className="bg-white rounded-b-xl shadow-md p-4">
        {transactions.map((tx, idx) => (
          <Card key={idx} className="mb-4">
            <CardContent className="p-4">
              <div className="text-sm text-gray-500">{tx.date}</div>
              <div className="text-xs text-gray-400 mb-1">{tx.postDate}</div>
              <div className="text-sm font-medium text-gray-800">{tx.description}</div>
              <div className="text-right text-red-600 font-semibold mt-1">{tx.amount}</div>
            </CardContent>
          </Card>
        ))}

        <div className="mt-6 flex flex-col gap-2">
          <Button variant="outline" className="w-full">Convert to SmartPay instalments</Button>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Pay card bill</Button>
        </div>
      </div>
    </div>
   );
};

export default Taiwan;
