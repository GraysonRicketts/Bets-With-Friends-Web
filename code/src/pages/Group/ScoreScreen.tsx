import { Typography } from "@mui/material";
import React from "react";
import { Bet, User, Group, uuid, points } from "../../interfaces";

interface Props {
  group: Group;
}

interface PooledWinner {
  winners: User[];
  poolTotal: points;
}

// TODO: Add unit tests
function calculateOverallUserScore(userId: uuid, bets: Bet[]) {
  const placedBets = bets.filter(
    (b) => !b.isOpen && b.wagers.find((w) => w.user.id === userId)
  );
  const wonBets = placedBets.filter(
    (b) =>
      b.outcome?.id === b.wagers.find((w) => w.user.id === userId)?.option.id
  );

  // Calculate winning pool
  const pooledWinners: PooledWinner[] = wonBets.map((b) => {
    const winners = b.wagers
      .filter((w) => w.option.id === b.outcome?.id)
      .map((w) => w.user);
    const poolTotal = b.wagers
      .map((w) => w.amount)
      .reduce((pv, cv) => pv + cv, 0);
    return {
      winners,
      poolTotal,
    };
  });
  // Divide winning pool by winners
  const winnings = pooledWinners.map((pw) => pw.poolTotal / pw.winners.length);
  // Sum winning pools
  return winnings.reduce((pv, cv) => pv + cv, 0);
}

export const ScoreScreen: React.FC<Props> = ({ group }) => {
  const overallScores: { user: User; overallScore: points }[] =
    group.members.map((user) => {
      const overallScore = calculateOverallUserScore(user.id, group.bets);
      return {
        user,
        overallScore,
      };
    });
  return (
    <>
      <Typography>Overall score</Typography>
      {overallScores.map((os) => (
        <Typography>
          {os.user.name} - {os.overallScore}
        </Typography>
      ))}
    </>
  );
};
