import { React } from 'jimu-core';
import { ImmutableObject } from 'seamless-immutable';
import { Chart, IDefinition } from '@esri/cedar';

export type IMDefinition = ImmutableObject<IDefinition>;

interface Props {
  definition: IMDefinition,
  loadDependencies?: () => Promise<any[]>,
  height?: number
}

interface State {
  dependenciesLoaded: boolean
}

export class CedarChart extends React.PureComponent<Props, State>{
  // default property values
  public static defaultProps: Partial<Props> = {
    height: 400
  };

  constructor(props) {
    super(props);

    // check to see if AmCharts is loaded
    const AmChartsGlobal = window['AmCharts'];
    const dependenciesLoaded = !!AmChartsGlobal && !!AmChartsGlobal.AmSerialChart;
    this.state = {
      dependenciesLoaded
    }
  }

  // get a ref to the dom node where we'll render the chart
  chartRoot: HTMLDivElement;
  setChartRootRef = el => {
    this.chartRoot = el;
  }

  _renderChart() {
    const {
      definition
    } = this.props;
    if (!this.chartRoot || !this.state.dependenciesLoaded || !definition) {
      return;
    }
    // render the chart
    const chart = new Chart(this.chartRoot, definition);
    chart.show();
  }

  componentDidMount(){
    if (!this.state.dependenciesLoaded) {
      // load dependencies and update the state
      const { loadDependencies } = this.props;
      /* tslint:disable no-unused-expression */
      loadDependencies && loadDependencies()
      .then(() => {
        this.setState({ dependenciesLoaded: true });
      });
      /* tslint:enable no-unused-expression */
    } else {
      // render the chart
      this._renderChart();
    }
  }

  componentDidUpdate() {
    // re-render the chart
    this._renderChart();
  }

  render(){
    return <div style={{height: this.props.height}} className='cedar-chart-root' ref={this.setChartRootRef}></div>
  }
}
