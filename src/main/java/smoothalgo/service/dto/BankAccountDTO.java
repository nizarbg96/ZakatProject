package smoothalgo.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link smoothalgo.domain.BankAccount} entity.
 */
public class BankAccountDTO implements Serializable {

    private Long id;

    @NotNull
    private String bankName;

    @NotNull
    private String bankAdress;

    @NotNull
    private BigDecimal rib;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankAdress() {
        return bankAdress;
    }

    public void setBankAdress(String bankAdress) {
        this.bankAdress = bankAdress;
    }

    public BigDecimal getRib() {
        return rib;
    }

    public void setRib(BigDecimal rib) {
        this.rib = rib;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BankAccountDTO bankAccountDTO = (BankAccountDTO) o;
        if (bankAccountDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bankAccountDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BankAccountDTO{" +
            "id=" + getId() +
            ", bankName='" + getBankName() + "'" +
            ", bankAdress='" + getBankAdress() + "'" +
            ", rib=" + getRib() +
            "}";
    }
}
