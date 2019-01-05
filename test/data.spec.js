require('../src/data.js');

const input = [{Year: '1960-01-04'}, {Year: '1965-01-04'}, {Year: '1970-01-04'}];
const output1 = [{Year: 1960}, {Year: 1965}, {Year: 1970}];
const output2 = [1960, 1965, 1970];
const output3 = [{Year: 1980}, {Year: 1965}, {Year: 1970}, {Year: 1965}];
const output4 = [{Year: 1965}, {Year: 1965}, {Year: 1970}, {Year: 1980}];
const output5 = [{Year: 1980}, {Year: 1970}, {Year: 1965}, {Year: 1965}];
const output6 = [{'Total_Injured_Persons_Recreational_Boating': 929, 'Total_Injured_Persons_Train_Accidents_Rail_Roads': null, 'Total_Injured_Persons_Transit_Non_Rail': null, Year: 1960}];
const output7 = [{'Total_Injured_Persons_Recreational_Boating': 929, 'Total_Injured_Persons_Train_Accidents_Rail_Roads': null, 'Total_Injured_Persons_Transit_Non_Rail': null, Year: 1960}];
const output8 = [{'Total_Injured_Persons_Recreational_Boating': 929, 'Total_Injured_Persons_Train_Accidents_Rail_Roads': null, 'Total_Injured_Persons_Transit_Non_Rail': null, Year: 1960}, 
  {'Total_Injured_Persons_Water': null, 'Total_Injured_Persons_Water_Not_Related_To_Vessel_Casualties': null, 'Total_Injured_Persons_Water_Vessel_Related': 97, Year: 1975}, 
  {'Total_Injured_Persons_Water': null, 'Total_Injured_Persons_Water_Not_Related_To_Vessel_Casualties': null, 'Total_Injured_Persons_Water_Vessel_Related': 180, Year: 1980}];
const output9 = [{'Total_Injured_Persons_Recreational_Boating': 929, 'Total_Injured_Persons_Train_Accidents_Rail_Roads': null, 'Total_Injured_Persons_Transit_Non_Rail': null, Year: 1960}, 
  {'Total_Injured_Persons_Water': null, 'Total_Injured_Persons_Water_Not_Related_To_Vessel_Casualties': null, 'Total_Injured_Persons_Water_Vessel_Related': 97, Year: 1975}, 
];

describe('injuries', () => {
  it('debería de ser un objeto', () => {
    expect(typeof injuries).toBe('object');
  });

  describe('injuries.cambiarPropiedad', () => {
    it('deberia de ser una funcion', () => {
      expect(typeof injuries.cambiarPropiedad).toBe('function');
    });
    it('debería de retornar un nuevo objeto con los años modificados a number', () => {
      expect(injuries.cambiarPropiedad(input)).toEqual(output1);
    });
    it('Debería retornar un nuevo array, no debe de cambiar el array original', () => {
      expect(injuries.cambiarPropiedad(input)).not.toEqual(input);
    });
  });
  
  describe('injuries.filtrarPropiedadEspecifica', () => {
    it('debería de ser una función', () => {
      expect(typeof injuries.filtrarPropiedadEspecifica).toBe('function');
    });
    it('debería de retornar un array con los datos requeridos', () => {
      expect(injuries.filtrarPropiedadEspecifica(output1, 'Year')).toEqual(output2);
    });
  });

  describe('injuries.sorts', () => {
    it('debería de ser una función', () => {
      expect(typeof injuries.sorts).toBe('function');
    });
    it('debería de retornar un array de objetos ordenado por años ascendente', () => {
      expect(injuries.sorts(output3, 'upward')).toEqual(output4);
    });
    it('debería de retornar un array de objetos ordenado por años descentente', () => {
      expect(injuries.sorts(output3, 'falling')).toEqual(output5);
    });
  });

  describe('injuries.filtro', () => {
    it('debería de ser una función', () => {
      expect(typeof injuries.filtro).toBe('function');
    });
    it('debería de retornar un array de objetos según la selección del usuario', () => {
      expect(injuries.filtro(output6, '1960')).toEqual(output7);
    });
  });

  describe('injuries.filtroMinMax', () => {
    it('debería de ser una función', () => {
      expect(typeof injuries.filtroMinMax).toBe('function');
    });
    it('debería de retornar un array de objetos según el rango de selección del usuario', () => {
      expect(injuries.filtroMinMax(output8, '1960', '1975')).toEqual(output9);
    });
  });
});