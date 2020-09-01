package smoothalgo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ExtraUser.
 */
@Entity
@Table(name = "extra_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExtraUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private BankAccount bankAccount;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "extraUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Beneficiary> beneficiarys = new HashSet<>();

    @OneToMany(mappedBy = "extraUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Zakat> zakats = new HashSet<>();

    @OneToMany(mappedBy = "extraUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Period> periods = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BankAccount getBankAccount() {
        return bankAccount;
    }

    public ExtraUser bankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
        return this;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    public User getUser() {
        return user;
    }

    public ExtraUser user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Beneficiary> getBeneficiarys() {
        return beneficiarys;
    }

    public ExtraUser beneficiarys(Set<Beneficiary> beneficiaries) {
        this.beneficiarys = beneficiaries;
        return this;
    }

    public ExtraUser addBeneficiarys(Beneficiary beneficiary) {
        this.beneficiarys.add(beneficiary);
        beneficiary.setExtraUser(this);
        return this;
    }

    public ExtraUser removeBeneficiarys(Beneficiary beneficiary) {
        this.beneficiarys.remove(beneficiary);
        beneficiary.setExtraUser(null);
        return this;
    }

    public void setBeneficiarys(Set<Beneficiary> beneficiaries) {
        this.beneficiarys = beneficiaries;
    }

    public Set<Zakat> getZakats() {
        return zakats;
    }

    public ExtraUser zakats(Set<Zakat> zakats) {
        this.zakats = zakats;
        return this;
    }

    public ExtraUser addZakats(Zakat zakat) {
        this.zakats.add(zakat);
        zakat.setExtraUser(this);
        return this;
    }

    public ExtraUser removeZakats(Zakat zakat) {
        this.zakats.remove(zakat);
        zakat.setExtraUser(null);
        return this;
    }

    public void setZakats(Set<Zakat> zakats) {
        this.zakats = zakats;
    }

    public Set<Period> getPeriods() {
        return periods;
    }

    public ExtraUser periods(Set<Period> periods) {
        this.periods = periods;
        return this;
    }

    public ExtraUser addPeriods(Period period) {
        this.periods.add(period);
        period.setExtraUser(this);
        return this;
    }

    public ExtraUser removePeriods(Period period) {
        this.periods.remove(period);
        period.setExtraUser(null);
        return this;
    }

    public void setPeriods(Set<Period> periods) {
        this.periods = periods;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExtraUser)) {
            return false;
        }
        return id != null && id.equals(((ExtraUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ExtraUser{" +
            "id=" + getId() +
            "}";
    }
}
