import { MockedImage } from "@/tests/mocks/image.mock";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: number;
  title: string;
  textStyles?: string;
}

const MockMetric = ({ imgUrl, alt, value, title, textStyles }: MetricProps) => {
  return (
    <div className={textStyles}>
      <MockedImage alt={alt} src={imgUrl} />
      {value} {title}
    </div>
  );
};

export { MockMetric };
