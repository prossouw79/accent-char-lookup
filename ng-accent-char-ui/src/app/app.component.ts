import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { invoke } from '@tauri-apps/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Accent Character Lookup';

  accentCharSet: AccentCharSet;
  accentCharacterViewModels: ACTableDataSourceViewModel[];
  receivedKeys: [] = [];
  displayedColumns: string[] = ['standard','A','G','C','U'];

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
      invoke("quit", {});
  }

  constructor(private _snackBar: MatSnackBar) {
    this.accentCharSet = new AccentCharSet()
    this.accentCharacterViewModels = this.mapAccentCharSet(this.accentCharSet);
  }

  ngOnInit(): void {

  }

  onCellClick(clickedValue: string){
    this._snackBar.open(`Copied ${clickedValue} to clipboard`, 'OK', {
      duration: 1500
    });
  }

  mapAccentCharSet(accentCharSet: AccentCharSet): ACTableDataSourceViewModel[] {
    const groupedByBase = this.groupBy(accentCharSet.accentChars,'base')
    const list: ACTableDataSourceViewModel[] = []
    for (const key in groupedByBase) {
      list.push({
        standard: key,
        A: accentCharSet.accentChars.filter(ac => ac.base == key && ac.modifier == 'acute')[0].character,
        G: accentCharSet.accentChars.filter(ac => ac.base == key && ac.modifier == 'grave')[0].character,
        C: accentCharSet.accentChars.filter(ac => ac.base == key && ac.modifier == 'circumflex')[0].character,
        U: accentCharSet.accentChars.filter(ac => ac.base == key && ac.modifier == 'umlaut')[0].character,
      })
    }
    return list
  }

  groupBy(arr: any[], criteria: Function|string) {
    return arr.reduce(function(obj, item) {
      const key = typeof criteria === 'function' ? criteria(item) : item[criteria];
      if (!obj.hasOwnProperty(key)) {
        obj[key] = [];
      }
      obj[key].push(item);
      return obj;
  
    }, {});
  };

}

export interface ACTableDataSourceViewModel {
  standard: string;
  A: string;
  G: string;
  C: string;
  U: string;
}

interface AccentChar {
  altCode: string;
  base: string;
  modifier: string;
  character: string;
}

// Model class for the set of characters
class AccentCharSet {
    accentChars: AccentChar[]
    raw: string[][] = [
        ['131', '??', 'a', 'circumflex'],
        ['132', '??', 'a', 'umlaut'],
        ['133', '??', 'a', 'grave'],
        ['160', '??', 'a', 'acute'],
        ['136', '??', 'e', 'circumflex'],
        ['137', '??', 'e', 'umlaut'],
        ['138', '??', 'e', 'grave'],
        ['130', '??', 'e', 'acute'],
        ['140', '??', 'i', 'circumflex'],
        ['139', '??', 'i', 'umlaut'],
        ['141', '??', 'i', 'grave'],
        ['161', '??', 'i', 'acute'],
        ['147', '??', 'o', 'circumflex'],
        ['148', '??', 'o', 'umlaut'],
        ['149', '??', 'o', 'grave'],
        ['162', '??', 'o', 'acute'],
        ['150', '??', 'u', 'circumflex'],
        ['129', '??', 'u', 'umlaut'],
        ['151', '??', 'u', 'grave'],
        ['163', '??', 'u', 'acute']
    ]

    constructor() {
        this.accentChars = this.raw.map(element => {
          return{
            altCode: element[0],
            character: element[1],
            base: element[2],
            modifier: element[3],
          }
        })
    }
}