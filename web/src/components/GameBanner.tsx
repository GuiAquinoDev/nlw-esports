import "keen-slider/keen-slider.min.css"


interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className="keen-slider__slide relative rounded-lg overflow-hidden">
      <img className="w-full sm:w-auto" src={props.bannerUrl} alt="" />

      <div className="pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">
          {props.title}
        </strong>
        <span className="text-zinc-300 text-sm block">{props.adsCount} anúncio(s)</span>
      </div>
    </a>
  );
}
