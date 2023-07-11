export interface MyFitnessReportResponse {
  chartType: string;
  title: string;
  category: string;
  label: string;
  data: Data[];
  ordinate_axis_min: string;
  ordinate_axis_max: string;
  goal: string;
}

export interface Data {
  date: string;
  total: number;
}
