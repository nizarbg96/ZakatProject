package smoothalgo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * A BankAccount.
 */
@Entity
@Table(name = "bank_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BankAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "bank_name", nullable = false)
    private String bankName;

    @NotNull
    @Column(name = "bank_adress", nullable = false)
    private String bankAdress;

    @NotNull
    @Column(name = "rib", precision = 21, scale = 2, nullable = false)
    private BigDecimal rib;

    @OneToMany(mappedBy = "bankAccount")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Balance> balances = new HashSet<>();

    @OneToOne(mappedBy = "bankAccount")
    @JsonIgnore
    private ExtraUser extraUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBankName() {
        return bankName;
    }

    public BankAccount bankName(String bankName) {
        this.bankName = bankName;
        return this;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankAdress() {
        return bankAdress;
    }

    public BankAccount bankAdress(String bankAdress) {
        this.bankAdress = bankAdress;
        return this;
    }

    public void setBankAdress(String bankAdress) {
        this.bankAdress = bankAdress;
    }

    public BigDecimal getRib() {
        return rib;
    }

    public BankAccount rib(BigDecimal rib) {
        this.rib = rib;
        return this;
    }

    public void setRib(BigDecimal rib) {
        this.rib = rib;
    }

    public Set<Balance> getBalances() {
        return balances;
    }

    public BankAccount balances(Set<Balance> balances) {
        this.balances = balances;
        return this;
    }

    public BankAccount addBalances(Balance balance) {
        this.balances.add(balance);
        balance.setBankAccount(this);
        return this;
    }

    public BankAccount removeBalances(Balance balance) {
        this.balances.remove(balance);
        balance.setBankAccount(null);
        return this;
    }

    public void setBalances(Set<Balance> balances) {
        this.balances = balances;
    }

    public ExtraUser getExtraUser() {
        return extraUser;
    }

    public BankAccount extraUser(ExtraUser extraUser) {
        this.extraUser = extraUser;
        return this;
    }

    public void setExtraUser(ExtraUser extraUser) {
        this.extraUser = extraUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BankAccount)) {
            return false;
        }
        return id != null && id.equals(((BankAccount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "BankAccount{" +
            "id=" + getId() +
            ", bankName='" + getBankName() + "'" +
            ", bankAdress='" + getBankAdress() + "'" +
            ", rib=" + getRib() +
            "}";
    }
}
