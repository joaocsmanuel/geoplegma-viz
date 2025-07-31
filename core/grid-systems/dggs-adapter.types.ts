interface DGGSAdapter {
  id: string;
  resolution: number;

  getZoneFromId( parent_id: string, densify: boolean): Zones;
  getZonesFromBbox(resolution: number, densify: boolean, bbox?: number[][]): Zones;

  getZonesFromPoint(resolution: number, point: LatLng, densify: boolean): Zones;
  getZonesFromParent(resolution: number, parent_id: string densify: boolean): Zones;

  // Optional utilities
  getNeighbors(index: string): string[];
  getCenter(index: string): [lat, lon];
  getChildren(index: string): string[];
}
