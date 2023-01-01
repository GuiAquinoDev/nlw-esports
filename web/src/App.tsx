import { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

import logoImg from "./assets/logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdsBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { useKeenSlider } from "keen-slider/react";
import { Arrow } from "./components/Arrow";

import "keen-slider/keen-slider.min.css";
import "./styles/main.css";

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    Ads: number;
  };
}

function App() {
 
  const [games, setGames] = useState<Game[]>([]);
  const [statusForm, setStatusForm] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  });

  console.log(instanceRef.current?.update);

  useEffect(() => {
    axios("http://localhost:3000/games").then((response) => {
      setGames(response.data);
    });    

  }, []);

  useEffect(() => {
    instanceRef.current?.update({
      slides: {
        perView: 5,
        spacing: 16,
      },
      breakpoints: {
        '(min-width: 768px) and (max-width: 1023px)': {
          slides: {
            perView: 3,
            spacing: 16
          }
        },
        '(max-width: 760px)': {
          slides: {
            perView: 1,
            spacing: 16
          }
        },
      }
    })
  })

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20 ">
      <img src={logoImg} alt="" />

      <h1 className="text-4xl md:text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div
        className="w-full flex items-center mt-[75px] gap-1"
      >
        <div>
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
          />
        </div>
        <div ref={sliderRef} className="keen-slider">
          {games.map((game) => (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.Ads}
            />
          ))}
        </div>
        <div>
          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
          />
        </div>
      </div>
   
      <Dialog.Root
        open={statusForm}
        onOpenChange={(status) => setStatusForm(status)}
      >
        <CreateAdBanner />

        <CreateAdModal setStatusForm={setStatusForm} />
      </Dialog.Root>
    </div>
  );
}

export { App };
