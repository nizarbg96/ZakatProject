package smoothalgo.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link smoothalgo.domain.Zakat} entity.
 */
public class ZakatDTO implements Serializable {

    private Long id;

    @NotNull
    private BigDecimal dueAmount;

    @NotNull
    private BigDecimal remainingAmount;


    private Long extraUserId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getDueAmount() {
        return dueAmount;
    }

    public void setDueAmount(BigDecimal dueAmount) {
        this.dueAmount = dueAmount;
    }

    public BigDecimal getRemainingAmount() {
        return remainingAmount;
    }

    public void setRemainingAmount(BigDecimal remainingAmount) {
        this.remainingAmount = remainingAmount;
    }

    public Long getExtraUserId() {
        return extraUserId;
    }

    public void setExtraUserId(Long extraUserId) {
        this.extraUserId = extraUserId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ZakatDTO zakatDTO = (ZakatDTO) o;
        if (zakatDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), zakatDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ZakatDTO{" +
            "id=" + getId() +
            ", dueAmount=" + getDueAmount() +
            ", remainingAmount=" + getRemainingAmount() +
            ", extraUserId=" + getExtraUserId() +
            "}";
    }
}
