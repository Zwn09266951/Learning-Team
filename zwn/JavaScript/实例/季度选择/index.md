今天工作的一个需求，还蛮有意思的 记录一下
![季度选择](https://github.com/Zwn09266951/Learning-Team/blob/master/zwn/JavaScript/%E5%AE%9E%E4%BE%8B/%08%E5%AD%A3%E5%BA%A6%E9%80%89%E6%8B%A9/date.gif "季度选择")
```JavaScript
import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const quarters = [0, 1, 2, 3].reduce((prev, current) => {
  prev.push(months.slice(current * 3, current * 3 + 3));
  return prev;
}, []);

function App() {
  const [selected, setSelected] = useState([]);

  function selectMonth(month) {
    const matchMonthIndex = selected.indexOf(month);
    if (matchMonthIndex === -1) return setSelected([...selected, month]);
    selected.splice(matchMonthIndex, 1);
    setSelected([...selected]);
  }
  function selectQuarter(quarter) {
    const match = calcQuarter(quarter);
    if (!match) return setSelected([...new Set([...selected, ...quarter])]);
    quarter.forEach(item => {
      const index = selected.indexOf(item);
      selected.splice(index, 1);
    });
    setSelected([...selected]);
  }

  function calcMonthSelected(month) {
    return selected.indexOf(month) > -1;
  }

  function calcQuarter(quarter) {
    return (
      selected
        .sort((a, b) => a - b)
        .toString()
        .indexOf(quarter.toString()) > -1
    );
  }

  return (
    <div className="App">
      <div>
        {months.map(month => (
          <div onClick={() => selectMonth(month)}>
            {month} {calcMonthSelected(month) ? "选中" : "未选中"}
          </div>
        ))}
      </div>
      ----------
      <div>
        {quarters.map(quarter => (
          <div onClick={() => selectQuarter(quarter)}>
            {quarter} {calcQuarter(quarter) ? "选中" : "未选中"}
          </div>
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```
