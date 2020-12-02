import { Tabs } from "antd";
import TableCard from "./component/TableCard";
import dayjs from "dayjs";

import "./style.less";

const { TabPane } = Tabs;

import tableData from "./tableData";
import http from "../../utils/http";

const TabTitle = ({ title }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 32,
      fontSize: 24,
    }}
  >
    {title}
  </div>
);
//刷新本页面时设置的不切换的功能
// sessionStorage.setItem();

export default class Dashboard extends React.Component {
  state = {
    tableList: [], //存放数据（一楼，二楼，三楼）
    tabKey: "all",
  };

  componentDidMount() {
    console.log("dayjs: ", dayjs(Date.now()).format("HH:mm"));
    //  const xhr = new XMLHttpRequest();
    //   xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4) {
    //       console.info("======", xhr.response);
    //     }
    //  };
    //  xhr.open("get", "/api/v1/wyz/dashboard/tables.json");
    //   xhr.send();
    http.get("/api/v1/dashboard/getTables").then((dd) => {
      // console.log(dd);
      this.setState({ tableList: dd.data });
    });
  }

  onChangeTab = (tabKey) => this.setState({ tabKey });

  render() {
    // const data = tableData.data.list;
    const { tableList } = this.state;
    console.log(tableList);

    return (
      <div className="dashboard-wrap">
        <Tabs
          defaultActiveKey="all"
          activeKey={this.state.tabKey}
          onChange={this.onChangeTab}
        >
          <TabPane
            tab={<TabTitle title="全部" />}
            key="all"
            style={{ minHeight: "50vh" }}
          >
            <div className="table-content">
              {tableList.map((item) => (
                <TableCard data={item} />
              ))}
            </div>
          </TabPane>
          <TabPane
            tab={<TabTitle title="一楼" />}
            key="1"
            style={{ minHeight: "50vh" }}
          >
            <div className="table-content">
              {tableList.map((item) => (
                <TableCard data={item} />
              ))}
            </div>
          </TabPane>
          <TabPane
            tab={<TabTitle title="二楼" />}
            key="2"
            style={{ minHeight: "50vh" }}
          >
            <div className="table-content">
              {tableList.map((item) => (
                <TableCard data={item} />
              ))}
            </div>
          </TabPane>
          <TabPane
            tab={<TabTitle title="三楼" />}
            key="3"
            style={{ minHeight: "50vh" }}
          >
            <div className="table-content">
              {tableList.map((item) => (
                <TableCard data={item} />
              ))}
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
