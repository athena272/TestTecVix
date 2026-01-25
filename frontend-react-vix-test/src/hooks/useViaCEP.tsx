import { useState, useEffect } from "react";
import { onlyDigits } from "../utils/onlyDigits";

export interface IViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface IAddressData {
  street: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  cityCode?: number;
}

export const useViaCEP = (cep: string) => {
  const [addressData, setAddressData] = useState<IAddressData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cleanCep = onlyDigits(cep);
    
    // CEP deve ter exatamente 8 dígitos
    if (cleanCep.length !== 8) {
      setAddressData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const fetchAddress = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data: IViaCEPResponse = await response.json();

        if (data.erro || !data.logradouro) {
          setError("CEP não encontrado");
          setAddressData(null);
          return;
        }

        setAddressData({
          street: data.logradouro || "",
          district: data.bairro || "",
          city: data.localidade || "",
          state: data.uf || "",
          cep: data.cep || cleanCep,
        });
        setError(null);
      } catch (err) {
        setError("Erro ao consultar CEP. Tente novamente.");
        setAddressData(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce de 500ms para evitar múltiplas requisições
    const timeoutId = setTimeout(fetchAddress, 500);
    
    return () => clearTimeout(timeoutId);
  }, [cep]);

  return { addressData, isLoading, error };
};
