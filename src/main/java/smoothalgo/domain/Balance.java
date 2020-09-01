package smoothalgo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * A Balance.
 */
@Entity
@Table(name = "balance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Balance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "balance_amount", precision = 21, scale = 2, nullable = false)
    private BigDecimal balanceAmount;

    @NotNull
    @Column(name = "balance_date", nullable = false)
    private LocalDate balanceDate;

    @ManyToOne
    @JsonIgnoreProperties("balances")
    private BankAccount bankAccount;

    @ManyToOne
    @JsonIgnoreProperties("balances")
    private Period period;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getBalanceAmount() {
        return balanceAmount;
    }

    public Balance balanceAmount(BigDecimal balanceAmount) {
        this.balanceAmount = balanceAmount;
        return this;
    }

    public void setBalanceAmount(BigDecimal balanceAmount) {
        this.balanceAmount = balanceAmount;
    }

    public LocalDate getBalanceDate() {
        return balanceDate;
    }

    public Balance balanceDate(LocalDate balanceDate) {
        this.balanceDate = balanceDate;
        return this;
    }

    public void setBalanceDate(LocalDate balanceDate) {
        this.balanceDate = balanceDate;
    }

    public BankAccount getBankAccount() {
        return bankAccount;
    }

    public Balance bankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
        return this;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Period getPeriod() {
        return period;
    }

    public Balance period(Period period) {
        this.period = period;
        return this;
    }

    public void setPeriod(Period period) {
        this.period = period;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Balance)) {
            return false;
        }
        return id != null && id.equals(((Balance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Balance{" +
            "id=" + getId() +
            ", balanceAmount=" + getBalanceAmount() +
            ", balanceDate='" + getBalanceDate() + "'" +
            "}";
    }
}
