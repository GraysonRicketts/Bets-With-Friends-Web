import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { ButtonRow } from "../../components/ButtonRow";
import { Bet, Category, uuid } from "../../interfaces";
import AddIcon from "@mui/icons-material/Add";
import { EditBetModal } from "./modals/EditBetModal";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { AddBetModal } from "./modals/AddBetModal";

interface Props {
  bets: Bet[];
}
interface GroupedBets {
  category: Category | undefined;
  bets: Bet[];
}

// TODO: Add unit tests
function groupByCategory(bets: Bet[]): GroupedBets[] {
  const groupedBets: GroupedBets[] = [];

  bets.forEach((b) => {
    const categoryGroup = groupedBets.find(
      (gb) =>
        (!gb.category && !b.category) || gb.category?.id === b.category?.id
    );
    if (categoryGroup) {
      categoryGroup.bets.push(b);
    } else {
      groupedBets.push({ category: b.category, bets: [b] });
    }
  });

  return groupedBets;
}

function getWagerStyle(bet: Bet, userId: uuid) {
  if (!bet.isOpen) {
    return { backgroundColor: "grey.400" } as const;
  }

  const isWagerPlaced = bet.wagers.find((w) => w.user.id === userId);
  if (isWagerPlaced) {
    return {} as const;
  }

  return {
    backgroundColor: "primary.main",
    color: "primary.contrastText",
  } as const;
}

export const CategorizedBets: React.FC<Props> = ({ bets }) => {
  const categorizedBets = groupByCategory(bets);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editBet, setEditBet] = useState<Bet | undefined>(undefined);
  const userId = useSelector((state: RootState) => state.user.id);

  return (
    <>
      {categorizedBets.map((gb) => {
        return (
          <Box key={`gb_bets_${gb.category?.id}`} sx={{ marginBottom: "3em" }}>
            <Typography>{gb.category?.name || "Uncategorized"}</Typography>

            {gb.bets.map((b) => {
              return (
                <ButtonRow
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setEditBet(b);
                  }}
                  sx={getWagerStyle(b, userId)}
                  key={`categorized_bet_title_${b.id}`}
                >
                  <Typography>{b.title}</Typography>
                </ButtonRow>
              );
            })}

            <IconButton
              aria-label="add bet"
              onClick={() => {
                setIsAddModalOpen(true);
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        );
      })}
      {editBet && (
        <EditBetModal
          isOpen={isEditModalOpen}
          bet={editBet}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
        />
      )}
      <AddBetModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
        }}
        categories={bets
          .map((b) => b.category)
          .filter((c: Category | undefined): c is Category => {
            return !!c;
          })
          .filter((v, i, pv) => pv.indexOf(v) === i)}
      />
    </>
  );
};
