// import { Typography } from '@mui/material';
import React from 'react';
// import { Bet } from 'src/api/bet';
import { GroupWithBet } from 'src/api/group';


// interface PooledWinner {
//   winners: User[];
//   poolTotal: points;
// }

// TODO: Add unit tests
// function calculateOverallUserScore(userId: uuid, bets: Bet[]) {
//   const placedBets = bets.filter(
//     (b) => b.closedAt && b.wagers.find((w) => w.user.id === userId),
//   );
//   const wonBets = placedBets.filter(
//     (b) => {
//       const winningOption = b.options.find(o => o.isFinalOption);
//       if (!winningOption) {
//         return false;
//       }

//       return winningOption.id === b.wagers.find((w) => w.user.id === userId)?.option.id
//     }
//   );

//   // Calculate winning pool
//   const pooledWinners: any[] = wonBets.map((b) => {
//     const winningOption = b.options.find(o => o.isFinalOption);
//     const winners = b.wagers
//       .filter((w) => w.option.id === winningOption?.id)
//       .map((w) => w.user);
//     const poolTotal = b.wagers
//       .map((w) => w.amount)
//       .reduce((pv, cv) => pv + cv, 0);
//     return {
//       winners,
//       poolTotal,
//     };
//   });
//   // Divide winning pool by winners
//   const winnings = pooledWinners.map((pw) => pw.poolTotal / pw.winners.length);
//   // Sum winning pools
//   return winnings.reduce((pv, cv) => pv + cv, 0);
// }

export const ScoreScreen: React.FC<{ group: GroupWithBet}> = ({group}) => {
  // const overallScores: { user: User; overallScore: points }[] =
  //   group.members.map((user) => {
  //     const overallScore = calculateOverallUserScore(user.id, group.bets);
  //     return {
  //       user,
  //       overallScore,
  //     };
  //   });
  return (
    <>
      {/* <Typography variant="h5">Overall score</Typography>
      {overallScores.map((os) => (
        <Typography variant="body1">
          {os.user.name} - {os.overallScore}
        </Typography>
      ))} */}
    </>
  );
};
