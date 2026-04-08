import type { Data, Layout, Config } from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-basic-dist-min";

const Plot = createPlotlyComponent(Plotly as never);

interface PlotlyChartProps {
  data: Data[];
  layout: Partial<Layout>;
  className?: string;
}

const config: Partial<Config> = {
  displayModeBar: false,
  responsive: true,
};

export function PlotlyChart({
  data,
  layout,
  className = "",
}: PlotlyChartProps) {
  return (
    <div className={className}>
      <Plot
        data={data}
        layout={{
          autosize: true,
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          font: {
            family: "Outfit, system-ui, sans-serif",
            color: "#384534",
          },
          margin: { l: 32, r: 16, t: 12, b: 36 },
          ...layout,
        }}
        config={config}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler
      />
    </div>
  );
}
