import { Connector } from 'wagmi';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';

import { useConnect } from './useConnect';

export function useDefaultWalletConnect() {
  const { connectAsync, connectors } = useConnect();
  return {
    openDefaultWalletConnect: async () => {
      const c: Connector<any, any> | undefined = connectors.find(
        (c) => c.id === 'walletConnect'
      );
      if (c) {
        const connector = new WalletConnectLegacyConnector({
          chains: c.chains,
          options: { ...c.options, qrcode: true },
        });

        try {
          await connectAsync({ connector: connector });
        } catch (err) {
          console.log('WalletConnect', err);
        }
      } else {
        console.log('No WalletConnect connector available');
      }
    },
  };
}
