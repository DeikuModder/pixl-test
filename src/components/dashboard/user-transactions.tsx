import { prisma } from "@/lib/prisma";

const UserTransactions = async ({ id }: { id: string }) => {
  const transaction = await prisma.transaction.findMany({
    where: { user_id: id },
  });

  const formattedTransactions = transaction.map((transaction) => ({
    ...transaction,
    id: transaction.id.toString(),
  }));

  return (
    <div className="p-4 flex flex-wrap items-center gap-4">
      {formattedTransactions.map((transaction) => {
        return (
          <article
            className="w-[300px] h-[400px] border border-muted rounded-2xl p-4 shadow-sm bg-background flex flex-col justify-between gap-2"
            key={transaction.id}
          >
            <h2 className="text-lg font-bold text-text">
              {transaction.status}
            </h2>
            <p>{transaction.price}</p>
          </article>
        );
      })}
    </div>
  );
};

export default UserTransactions;
