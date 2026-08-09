/** 极简 Markdown：标题、段落、列表、粗体、表格（足够节点正文） */
export function renderSimpleMarkdown(src: string): string {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let i = 0;
  let inUl = false;
  let inTable = false;

  const closeUl = () => {
    if (inUl) {
      html.push("</ul>");
      inUl = false;
    }
  };
  const closeTable = () => {
    if (inTable) {
      html.push("</tbody></table>");
      inTable = false;
    }
  };

  const inline = (text: string) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("|") && line.includes("|", 1)) {
      closeUl();
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      const isSep = cells.every((c) => /^:?-{3,}:?$/.test(c));
      if (isSep) {
        i += 1;
        continue;
      }
      if (!inTable) {
        html.push('<table><tbody>');
        inTable = true;
        html.push(
          `<tr>${cells.map((c) => `<th>${inline(c)}</th>`).join("")}</tr>`,
        );
      } else {
        html.push(
          `<tr>${cells.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`,
        );
      }
      i += 1;
      continue;
    }

    closeTable();

    if (line.startsWith("## ")) {
      closeUl();
      html.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("# ")) {
      closeUl();
      html.push(`<h1>${inline(line.slice(2))}</h1>`);
    } else if (/^[-*] /.test(line)) {
      if (!inUl) {
        html.push("<ul>");
        inUl = true;
      }
      html.push(`<li>${inline(line.slice(2))}</li>`);
    } else if (/^\d+\.\s/.test(line)) {
      closeUl();
      // 简易有序：用 ol 连续段落处理——收集连续编号
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i += 1;
      }
      html.push(
        `<ol>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</ol>`,
      );
      continue;
    } else if (line.trim() === "") {
      closeUl();
    } else {
      closeUl();
      html.push(`<p>${inline(line)}</p>`);
    }
    i += 1;
  }

  closeUl();
  closeTable();
  return html.join("\n");
}
