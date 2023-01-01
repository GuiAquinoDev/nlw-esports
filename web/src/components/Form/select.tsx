import * as Select from "@radix-ui/react-select";
import { CaretDown } from "phosphor-react";
import { Game } from "../CreateAdModal";

interface IGameProps {
  games: Game[];
}

export function SelecForm(props: IGameProps) {
  return (
    <Select.Root
    name="game"
    >
      <Select.Trigger    
        className=" flex justify-between py-3 px-4 rounded text-sm bg-zinc-900"
      >
        <Select.Value
         placeholder="Selecione o game que deseja jogar"/>
        <Select.Icon>
          <CaretDown size={24} color="#a1a1aa" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="w-[400px] fixed left-10 py-3 px-4 rounded text-sm bg-zinc-900 placeholder:text-zinc-500">
        <Select.Viewport className="flex flex-col	gap-2">
          {props.games.map((game) => (
            <Select.Item
              className="cursor-pointer hover:text-violet-400"
              key={game.id}
              value={game.id}
            >
              <Select.ItemText>{game.title}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}
