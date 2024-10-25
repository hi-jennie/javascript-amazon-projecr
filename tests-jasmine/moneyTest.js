import { formatCurrency } from "../scripts/utils/money.js";

export describe('formatCurrency: testing suite',()=>{
  it ('converts cents into dollars',()=>{
    expect(formatCurrency(2095)).toEqual('20.95')
  });

  it ('work with zero',()=>{
    expect(formatCurrency(0)).toEqual('0.00')
  });

  it ('round up to the nearest cent',()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01')
  });
});