export function toGrid(inputLines) {}

// export type coord = [number, number];
// export type gridItem<T> = [number, number, T];
// export type range = { minX: number; minY: number; maxX: number; maxY: number };

export class Grid {
  // this can be more performant to use an object than a sparse array
  items = {};
  range = new RangeTracker();

  set(x, y, value) {
    this.range.log(x, y);
    const { xKey, yKey } = keyStrings(x, y);
    if (!this.items[xKey]) {
      this.items[xKey] = {};
    }
    this.items[xKey][yKey] = value;
  }

  get(x, y) {
    const { xKey, yKey } = keyStrings(x, y);
    const xRow = this.items[xKey];
    if (!xRow) return null;
    //if (!Object.hasOwn(xRow, yKey)) return null;
    if (!xRow || !Object.keys(xRow).some(key => key === yKey)) return null;
    return xRow[yKey];
  }

  loadLine(line, y) {
    for (let x = 0; x < line.length; x++) {
      this.set(x, y, line[x]);
    }
  }

  loadLines(lines) {
    for (let y = 0; y < lines.length; y++) {
      this.loadLine(lines[y], y);
    }
  }

  toString(range) {
    if (!range) {
      range = this.determineRange();
    }
    let output = "";

    for (let y = range.minY; y <= range.maxY; y++) {
      for (let x = range.minX; x <= range.maxX; x++) {
        output += this.get(x, y) ?? " ";
      }
      output += "\n";
    }
    return output.trimEnd();
  }

   determineRange() {
    return this.range.range();
  }

  find(token) {
    for (const xKey in this.items) {
      const col = this.items[xKey];
      if (!col) continue;
      for (const yKey in col) {
        const item = col[yKey];
        if (item === token) {
          return {x: parseInt(xKey), y: parseInt(yKey)}
        }
      }
    }
  }

  isInRange(x, y) {
    const r = this.determineRange();
    return x >= r.minX && x <= r.maxX && y >= r.minY && y <= r.maxY;
  }
}

class RangeTracker {
  minX = undefined;
  minY = undefined;
  maxX = undefined;
  maxY = undefined;

  logX(x) {
    if (typeof this.minX === "undefined" || x < this.minX) {
      this.minX = x;
    }
    if (typeof this.maxX === "undefined" || x > this.maxX) {
      this.maxX = x;
    }
  }

  logY(y) {
    if (typeof this.minY === "undefined" || y < this.minY) {
      this.minY = y;
    }
    if (typeof this.maxY === "undefined" || y > this.maxY) {
      this.maxY = y;
    }
  }

  log(x, y) {
    this.logX(x);
    this.logY(y);
  }

  range() {
    return {
      minX: this.minX ?? 0,
      minY: this.minY ?? 0,
      maxX: this.maxX ?? 0,
      maxY: this.maxY ?? 0,
    };
  }
}

function keyStrings(x, y) {
  return { xKey: x.toString(), yKey: y.toString() };
}
