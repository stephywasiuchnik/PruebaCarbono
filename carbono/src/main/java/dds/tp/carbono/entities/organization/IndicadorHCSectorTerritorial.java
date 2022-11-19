package dds.tp.carbono.entities.organization;

import dds.tp.carbono.entities.huella.HuellaCarbono;
import lombok.Getter;
import lombok.Setter;

public class IndicadorHCSectorTerritorial {
    @Getter @Setter private HuellaCarbono huella;
    @Getter @Setter private Double valor;
}
