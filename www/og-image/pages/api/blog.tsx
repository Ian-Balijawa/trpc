/* eslint-disable react/no-unknown-property */
import { ImageResponse } from '@vercel/og';
import { blogParams } from 'utils/zodParams';

export const config = {
  runtime: 'experimental-edge',
};

export default async (req: Request) => {
  const url = new URL(req.url);

  const parsed = blogParams.decodeURL(url);
  if (!parsed.success) {
    return new Response(parsed.error.toString(), { status: 400 });
  }

  const props = parsed.data;

  return new ImageResponse(
    (
      <div tw="bg-zinc-900 h-full w-full text-white bg-cover flex flex-col p-14">
        <img
          src="https://assets.trpc.io/www/og-pattern-dark.svg"
          alt="background"
          tw="absolute"
        />
        <div tw="flex flex-col justify-between w-full h-full">
          <div tw="flex flex-col w-full">
            <div tw="flex justify-between items-center w-full">
              <div tw="flex flex-col flex-1 pr-6">
                <p tw="text-blue-500 text-xl font-semibold">{props.date}</p>
                <h1 tw="text-6xl font-extrabold">{props.title}</h1>
              </div>
              <img
                src="https://assets.trpc.io/icons/svgs/blue-bg-rounded.svg"
                width="84px"
                height="84px"
                alt="tRPC logo"
              />
            </div>
            <p tw="text-3xl leading-snug font-semibold text-zinc-300">
              {props.description}
            </p>
            <p tw="text-xl text-blue-500 font-semibold leading-3">
              {Math.round(props.readingTimeInMinutes)} min read
            </p>
          </div>
          <div tw="flex items-center">
            <img
              src={props.authorImg}
              alt="author profile"
              width="75px"
              height="75px"
              tw="mr-6 rounded-xl"
            />
            <div tw="flex flex-col justify-center">
              <p tw="text-2xl leading-[1px]">{props.authorName}</p>
              <p tw="text-xl leading-[1px] text-zinc-300">
                {props.authorTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
};
