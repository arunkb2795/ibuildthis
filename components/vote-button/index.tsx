"use client";
import {
  downVoteProductAction,
  upVoteProductAction,
} from "@/actions/product-action";
import { Button } from "../ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useOptimistic, useTransition } from "react";

const VotingButton = ({
  id,
  voteCount: initialVoteCount,
}: {
  id: number;
  voteCount: number;
}) => {
  const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
    initialVoteCount,
    (currentCount, change: number) => Math.max(0, currentCount + change),
  );

  const [isPending, startTransition] = useTransition();

  const handleUpVote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(1);
      await upVoteProductAction(id);
    });
  };

  const handleDownVote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(-1);
      await downVoteProductAction(id);
    });
  };

  return (
    <div
      className="mt-5"
      onClick={(e) => {
        return e.preventDefault();
      }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={handleUpVote}
        disabled={isPending}
      >
        <ArrowUpIcon />
      </Button>
      <span className="mx-3">{optimisticVoteCount}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={handleDownVote}
        disabled={isPending || optimisticVoteCount === 0}
      >
        <ArrowDownIcon/>
      </Button>
    </div>
  );
};

export default VotingButton;
