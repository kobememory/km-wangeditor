<template>
  <div>
    <div class="button-wrap">
      <div
        v-for="item in placeholderList"
        :key="item.value"
        @click="() => handleInsertPlaceholder(item.value, item.alias)"
      >
        {{ item.buttonText }}
      </div>

      <br />
      <button @click="clearEditor">清空</button>
      <button @click="restore">恢复到清空前的内容</button>
    </div>

    <div>
      <div
        id="toolbar-container"
        style="border: 1px solid #ccc; border-bottom: none"
      ></div>
      <div id="editor-container" style="border: 1px solid #ccc; height: 305px"></div>
    </div>
    <div>Text length: {{ totalLength }}</div>

    <div style="margin-top: 20px; display: flex">
      <div style="flex: 1; padding-right: 5px">
        <textarea id="text-html" style="width: 100%; height: 300px"></textarea>
      </div>
      <div style="flex: 1; padding-left: 5px">
        <textarea id="text" style="width: 100%; height: 300px"></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import "km-wangeditor/assets/index.less";
  import { createEditor, createToolbar, DomEditor } from "km-wangeditor";
  import type { IDomEditor, IEditorConfig } from "km-wangeditor";

  let editor: IDomEditor;
  let backup: string = "";
  const totalLength = ref(0);

  const placeholderList: IEditorConfig['placeholderList'] = [
    { value: "#NICKNAME#", alias: "#昵称#", buttonText: "插入昵称" },
    { value: "#TITLE#", buttonText: "插入标题" },
  ];

  onMounted(() => {
    editor = createEditor({
      selector: "#editor-container",
      html: "<p>hello world</p>",
      config: {
        maxLength: 30,
        onChange() {
          showContent()
        },
        placeholderList: placeholderList,
      },
    });

    showContent()

    createToolbar({
      editor,
      selector: "#toolbar-container",
      config: {},
    });

    (window as any).editor = editor;
  });

  const showContent = () => {
    if (!editor) return

    const html = editor.getHtml();
    const text = editor.getText();
    // @ts-ignore
    document.getElementById("text-html").value = html;
    // @ts-ignore
    document.getElementById("text").value = text;

    totalLength.value = text.replace(/\n|\r/gm, "").length;
  }

  const handleInsertPlaceholder = (value: string, alias?: string) => {
    editor.insertPlaceholder(value, alias);
  };

  const clearEditor = () => {
    backup = editor.getText();
    console.log(backup);
    editor.clear();
  };

  const restore = () => {
    editor.setText(backup);
  };
</script>

<style lang="less">
  .button-wrap {
    button {
      margin: 0 4px 4px 0;
    }
  }

  .w-e-placeholder-container {
    color: green;
  }
</style>
