<template>
  <div>
    <el-upload
      action="#"
      :auto-upload="false"
      :on-change="onChange"
      :limit="1"
      :show-file-list="false"
      accept=".xls,.xlsx"
    >
      <el-button type="primary">上传excel</el-button>
    </el-upload>
    <el-button @click="readFile">读取</el-button>
    <input type="file" id="upload" accept=".xlsx, .xls" />
    <pre id="output"></pre>
  </div>
</template>

<script>
import xlsx from "xlsx";
import lang from "./appLanguage";
export default {
  data() {
    return {
      options: [
        { label: "第一个", value: 1 },
        { label: "第二个", value: 2 },
        { label: "第三个", value: 3 },
      ],
      value: "",
      deadline4: Date.now() + 1000 * 30 * 60,
      msg: "",
    };
  },
  mounted() {
    document
      .getElementById("upload")
      .addEventListener("change", this.handleFile, false);
    console.log("qqqq", lang["中文"]);
  },
  methods: {
    onChange() {},
    handleEnterKey(e) {
      console.log("eeeeeeeeee", e);
    },
    lineFeed() {},
    hilarity() {},
    async readFile(file) {
      console.log(file);
      // 读取 Excel 文件
      const workbook = xlsx.read("./fy.xlsx");

      // 假设我们只处理第一个工作表
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // 将工作表转换为 JSON 格式
      const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

      // 获取表头和数据
      const headers = data[0].slice(1); // 从第二列开始获取表头
      console.log("headers", headers);
      const result = [];

      // 从第二行开始遍历数据
      for (let i = 1; i < data.length; i++) {
        const row = data[i];

        // 第一列的值作为对象的key
        const mainKey = row[0];

        // 初始化对象
        const obj = {};

        // 遍历第二列开始的每个值
        for (let j = 1; j < row.length; j++) {
          const value = row[j];
          obj[headers[j - 1]] = value; // 表头作为key，值作为value
        }

        // 将生成的对象推入结果数组，使用mainKey作为键名
        result.push({ [mainKey]: obj });
      }

      // 输出结果
      console.log("haha", result);
    },
    getHeaderRow(sheet) {
      const headers = []; // 定义数组，用于存放解析好的数据
      const range = xlsx.utils.decode_range(sheet["!ref"]); // 读取sheet的单元格数据
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers; // 经过上方一波操作遍历，得到最终的第一行头数据
    },
    handleFile(event) {
      const file = event.target.files[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();

      // 当文件读取完成时触发
      reader.onload = function (e) {
        const d = new Uint8Array(e.target.result);
        const workbook = xlsx.read(d, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // 获取第一个工作表的名称
        const worksheet = workbook.Sheets[sheetName]; // 获取第一个工作表
        // 将工作表转换为json数据
        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

        // 获取表头（假设表头是第一行）
        const headers = data.shift();

        // 创建一个大对象存储结果
        const result = {};

        // 从第二列开始的每个表头作为一个大对象的key
        headers.slice(1).forEach((header, index) => {
          result[header] = {};
        });

        // 遍历每行数据
        data.forEach((row) => {
          // 将每行的第一列的值作为这个对象中的一个key
          const key = row[0];

          // 遍历从第二列开始的每个值
          row.slice(1).forEach((value, index) => {
            // 获取对应的表头（大对象的key）
            const header = headers[index + 1];

            // 将这一行对应该大对象可以所在的列的值作为value值
            result[header][key] = value;
          });
        });

        console.log(result);

        // 输出结果到页面
        document.getElementById("output").textContent = JSON.stringify(
          result,
          null,
          2
        );
      };

      // 读取文件
      reader.readAsArrayBuffer(file);
    },
  },
};
</script>

<style lang="scss" scoped></style>
